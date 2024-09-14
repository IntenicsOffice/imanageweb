import { useEffect, useState, useCallback } from "react";
import { Modal, Button, Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { SubscriptionController } from "../../../_controllers/index.js";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { getCookie } from "../utils/ClientHelpers.js";
import Helpers from "../utils/Helpers.js";
import CustomFunction from "../utils/CustomFunction.js";
import Constants from "../../../constants/index.js";
import sha256 from 'crypto-js/sha256';
import axios from "axios";
import CryptoJS from 'crypto-js';



const SubscriptionModal = ({ show, handleClose }) => {
    const router = useRouter();

    const pathname = usePathname()
    const [packageType, setPackageType] = useState([]);
    const [devicePrice, setDevicePrice] = useState(0);
    const [selectedPlan, setSelectedPlan] = useState('');
    const [packageTypeId, setPackageTypeId] = useState('');
    const [packageMonthlyPrice, setPackageMonthlyPrice] = useState(0);
    const [packageYearlyPrice, setPackageYearlyPrice] = useState(0);
    const [isDeviceChecked, setIsDeviceChecked] = useState(false); // New state for checkbox
    const [numOfDevice, setNumOfDevice] = useState(0); // Initialize state for employee count
    const [totalDeviceAmount, setTotalDeviceAmount] = useState(0); // Initialize state for employee count
    const [numOfEmployee, setNumOfEmployee] = useState(0); // Initialize state for employee count
    const [totalEmployeeAmount, setTotalEmployeeAmount] = useState(0); // Initialize state for total amount


    const getPackageType = async () => {
        const response = await SubscriptionController.packageType();
        if (response.status === 200) {
            setPackageType(response.data);
            setDevicePrice(response.device_price);

            const monthlyPlan = response.data.find(item => item.package_category === 'Monthly');
            if (monthlyPlan) {
                setSelectedPlan(`package_type-${response.data.indexOf(monthlyPlan)}`);
                setPackageMonthlyPrice(monthlyPlan.package_price);
            }

            const yearlyPlan = response.data.find(item => item.package_category === 'Yearly');
            if (yearlyPlan) {
                setPackageYearlyPrice(yearlyPlan.package_price);
            }
        }
    }

    const handleRadioChange = (event) => {
        setSelectedPlan(event.target.id);
    };

    const handleCheckboxChange = (event) => {
        setIsDeviceChecked(event.target.checked);
    };

    // number of device
    const numOfDeviceHandleChange = (event) => {
        const value = Math.max(0, parseInt(event.target.value, 10) || 0); // Ensure non-negative integer
        setNumOfDevice(value);
    };

    const handleDecrementDevice = () => {
        setNumOfDevice(prevCount => (prevCount > 0 ? prevCount - 1 : 0)); // Ensure it doesn't go below 0
    };

    const handleIncrementDevice = () => {
        setNumOfDevice(prevCount => prevCount + 1);
    };

    // number of employee
    const numOfEmployeeHandleChange = (event) => {
        const value = Math.max(0, parseInt(event.target.value, 10) || 0); // Ensure non-negative integer
        setNumOfEmployee(value);
    };

    const handleIncrementEmployee = () => {
        setNumOfEmployee(prevCount => prevCount + 1);
    };

    const handleDecrementEmployee = () => {
        setNumOfEmployee(prevCount => (prevCount > 0 ? prevCount - 1 : 0)); // Ensure it doesn't go below 0
    };

    // const calculateDeviceAmount = () => {
    //     const total_amount = (numOfDevice * devicePrice);
    //     setTotalDeviceAmount(total_amount);
    // }

    const calculateDeviceAmount = useCallback(() => {
        const total_amount = (numOfDevice * devicePrice);
        setTotalDeviceAmount(total_amount);
    }, [numOfDevice, devicePrice]); 

    const calculateEmployeeAmount = useCallback(() => {
        const selectedPackage = packageType.find(item => `package_type-${packageType.indexOf(item)}` === selectedPlan);
        if (selectedPackage) {
            setPackageTypeId(selectedPackage._id);
            if (selectedPackage.package_category === "Monthly") {
                const total_amount = numOfEmployee * packageMonthlyPrice;
                setTotalEmployeeAmount(total_amount);

            }

            if (selectedPackage.package_category === "Yearly") {
                const total_amount = (numOfEmployee * packageYearlyPrice) * 12;
                setTotalEmployeeAmount(total_amount);
            }
        }
    },[selectedPlan, packageType, numOfEmployee, packageMonthlyPrice, packageYearlyPrice]);

    const postPayment = async () =>{
        const companyIdCookie = getCookie("company_id");
        const merchant_transaction_id = 'MT' + CustomFunction.generateRandomId();
        const formData = {
            company_id: companyIdCookie,
            payment: (totalDeviceAmount + totalEmployeeAmount),
            merchant_transaction_id: merchant_transaction_id,
            payment_status: Constants.PAYMENT_PENDING,
            package_type_id: packageTypeId,
            no_of_employee:numOfEmployee,
            package_amount:totalEmployeeAmount,
            device_quantity:numOfDevice, 
            device_amount:totalDeviceAmount,
        }

        const response = await SubscriptionController.subscriptionPayment(formData);
        if (response.status === 200) {
            console.log("response.data", response.data);
            // await SubscriptionController.phonePe(response.data);
            const res = await axios.post('/api/initiatePayment', response.data);
            // const res = await phonePe(response.data);
            console.log("res**************", res);

            if (res.data.success) {
                window.location.href = res.data.paymentUrl;
            } else {
                alert('Payment initiation failed. Please try again.');
            }
        }
    }

    const phonePe = async (paymentDocument) => {
   
        const { company_id, merchant_transaction_id, payment } = paymentDocument;
        // console.log("paymentDocument", paymentDocument);

        try {

            let payload = {
                merchantId: 'PGTESTPAYUAT',
                merchantTransactionId: merchant_transaction_id,
                merchantUserId: company_id,
                amount: payment * 100, // converting to paise
                redirectUrl: 'http://139.59.69.40:3537/success',
                redirectMode: 'POST',
                callbackUrl: 'http://139.59.69.40:3537/success',
                mobileNumber: '7880024466',
                paymentInstrument: {
                    type: "PAY_PAGE",
                },
            };
            console.log(payload)
            const dataPayload = JSON.stringify(payload);
            const encodedPayload = Buffer.from(dataPayload).toString('base64');
            console.log("encodedPayload", encodedPayload)
    
            const endpoint = '/pg/v1/pay';
            // const saltKey = '698156b4-767b-452d-adc7-68c04d933f0d';
            const saltKey = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
            const merchantKeyIndex = '1';
            const dataSha256 = CryptoJS.SHA256(encodedPayload + endpoint + saltKey).toString(CryptoJS.enc.Hex);
            const xVerify = `${dataSha256}###${merchantKeyIndex}`;
            console.log('X-VERIFY', xVerify);
            
            // const UAT_PAY_API_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
            const UAT_PAY_API_URL = "https://api-preprod.phonepe.com/apis/pg-sandbox";
            const phonePeResponse = await axios.post(UAT_PAY_API_URL,{ request: encodedPayload},
                {
                    headers: {
                        accept: "application/json",
                        "Access-Control-Allow-Headers" : "Content-Type",
                        "Access-Control-Allow-Origin": "*",
                        "Content-Type": "application/json",
                        "X-VERIFY": xVerify,
                    },
    
                });
    
            console.log("phonePeResponse.data", phonePeResponse.data);
            if (phonePeResponse.data.success) {
                console.log("phonePeResponse", phonePeResponse.data.data.instrumentResponse.redirectInfo.url);
                const url = phonePeResponse.data.data.instrumentResponse.redirectInfo.url;

                const redirect = response.data.data.instrumentResponse.redirectInfo.url;
                router.push(redirect)
                // return new Response(JSON.stringify({ success: true, paymentUrl: phonePeResponse.data.data.instrumentResponse.redirectInfo.url }));
            } else {
                console.log("error", phonePeResponse.data)
                // return new Response(JSON.stringify({ success: false, message: 'Payment initiation failed.' }), { status: 400 });
            }
        } catch (error) {   
            console.error('Error with PhonePe API:', error);
            // return new Response(JSON.stringify({ success: false, message: 'Internal server error.' }), { status: 500 });
        }


    
    }


    useEffect(() => {
        calculateDeviceAmount();
    }, [calculateDeviceAmount]);

    useEffect(() => {
        calculateEmployeeAmount();
    }, [calculateEmployeeAmount]);

    useEffect(() => {
        getPackageType();
    }, [pathname]);


    return (
        <>
            <Modal show={show} onHide={() => {
                handleClose()
                setIsDeviceChecked(false);
                setNumOfDevice(0);
                setNumOfEmployee(0);
            }} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Select To Buy</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <Card >
                            <Card.Body>
                                {
                                    packageType.map((item, index) => (
                                        <Row key={index}>
                                            <Col md={5}>
                                                <Form>
                                                    <div key={`package_type-${index}`} className="mb-2">
                                                        <Form.Text>
                                                            <Form.Check
                                                                type="radio"
                                                                id={`package_type-${index}`}
                                                                name="subscriptionPlan"
                                                                label={`${item.package_category} Subscription`}
                                                                package-category={item.package_category}
                                                                value={item.package_price}
                                                                checked={selectedPlan === `package_type-${index}`}
                                                                onChange={handleRadioChange}
                                                            />
                                                        </Form.Text>
                                                    </div>
                                                </Form>
                                            </Col>
                                            <Col md={5}>
                                                <Form.Text>
                                                    : {item.package_price} / per user
                                                </Form.Text>
                                            </Col>
                                        </Row>

                                    ))
                                }
                                <Row>
                                    <Col md={5}>

                                        <div className="mb-2">
                                            <Form.Text>
                                                <Form.Check
                                                    type="checkbox"
                                                    id="device_quantity"
                                                    name="device_quantity"
                                                    label="Num of Device"
                                                    checked={isDeviceChecked}
                                                    onChange={handleCheckboxChange} // Update checkbox state
                                                />
                                            </Form.Text>
                                        </div>
                                    </Col>
                                    <Col md={3} >
                                        <Form.Text>
                                            : {totalDeviceAmount}
                                        </Form.Text>
                                    </Col>
                                    <Col md={4}>

                                        {isDeviceChecked && (

                                            <InputGroup className="mb-2" size="sm">
                                                <Button variant="outline-success" id="device_decrement" onClick={handleDecrementDevice}>
                                                    <i className="bi bi-dash"></i>
                                                </Button>
                                                <Form.Control
                                                    aria-label="Example text with button addon"
                                                    aria-describedby="basic-addon1"
                                                    type="text"
                                                    id="device_quantity" // Set the id attribute
                                                    name="device_quantity" // Set the name attribute
                                                    className="text-center"
                                                    value={numOfDevice}
                                                    onChange={numOfDeviceHandleChange}
                                                />
                                                <Button variant="outline-success" id="device_increment" onClick={handleIncrementDevice}>
                                                    <i className="bi bi-plus"></i>
                                                </Button>
                                            </InputGroup>
                                        )}
                                    </Col>

                                </Row>
                                <Row>
                                    <Col md={5}>
                                        <div className="mb-2">
                                            <Form.Text> Number Of Employee </Form.Text>
                                        </div>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Text>
                                            : {totalEmployeeAmount}
                                        </Form.Text>
                                    </Col>
                                    <Col md={4}>
                                        <InputGroup className="mb-3" size="sm">
                                            <Button variant="outline-success" id="employee_decrement" onClick={handleDecrementEmployee}>
                                                <i className="bi bi-dash"></i>
                                            </Button>
                                            <Form.Control
                                                aria-label="Example text with button addon"
                                                aria-describedby="basic-addon1"
                                                type="text"
                                                id="no_of_employee" // Set the id attribute
                                                name="no_of_employee" // Set the name attribute
                                                className="text-center"
                                                value={numOfEmployee}
                                                onChange={numOfEmployeeHandleChange}
                                            />
                                            <Button variant="outline-success" id="employee_increment" onClick={handleIncrementEmployee}>
                                                <i className="bi bi-plus"></i>
                                            </Button>
                                        </InputGroup>
                                    </Col>

                                </Row>
                            </Card.Body>
                            <Card.Footer >
                                <Row>
                                    <Col md={9}>
                                        Total Amount - {totalDeviceAmount + totalEmployeeAmount}
                                    </Col>
                                    <Col md={3}>
                                        <Button variant="primary" size="sm" onClick={postPayment}>
                                            Buy Now
                                        </Button>
                                    </Col>
                                </Row>

                            </Card.Footer>
                        </Card>

                    </div>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer> */}
            </Modal>
        </>
    );
}

export default SubscriptionModal;