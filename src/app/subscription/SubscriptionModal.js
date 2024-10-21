import { useEffect, useState, useCallback } from "react";
import { Modal, Button, Card, Form, Row, Col, InputGroup } from 'react-bootstrap';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';

import { fetchPackageType, subscriptionPayment } from "../../../_controllers/SubscriptionController.js";

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
        const response = await fetchPackageType();
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
    }, [selectedPlan, packageType, numOfEmployee, packageMonthlyPrice, packageYearlyPrice]);

    const postPayment = async () => {
        const companyIdCookie = getCookie("company_id");
        const merchant_transaction_id = 'MT' + CustomFunction.generateRandomId();
        const formData = {
            company_id: companyIdCookie,
            payment: (totalDeviceAmount + totalEmployeeAmount),
            merchant_transaction_id: merchant_transaction_id,
            payment_status: Constants.PAYMENT_PENDING,
            package_type_id: packageTypeId,
            no_of_employee: numOfEmployee,
            package_amount: totalEmployeeAmount,
            device_quantity: numOfDevice,
            device_amount: totalDeviceAmount,
        }

        const response = await subscriptionPayment(formData);
        if (response.status === 200) {
            const form = document.createElement('form');
            form.method = 'POST';
            // form.action = 'http://localhost:8085/payment/imanage-payment'; // Target URL

            form.action = 'https://intenics.in/payment/imanage-payment'; // Target URL
            // form.action = 'https://intenics.in/imanage-payment'; // Target URL
            // form.target = '_blank'; // Open in a new tab

            const companyInput = document.createElement('input');
            companyInput.type = 'hidden';
            companyInput.name = 'company_id';
            companyInput.value = response.data.company_id;

            const transactionInput = document.createElement('input');
            transactionInput.type = 'hidden';
            transactionInput.name = 'merchant_transaction_id';
            transactionInput.value = response.data.merchant_transaction_id;

            const paymentInput = document.createElement('input');
            paymentInput.type = 'hidden';
            paymentInput.name = 'payment';
            paymentInput.value = response.data.payment;

            form.appendChild(companyInput);
            form.appendChild(transactionInput);
            form.appendChild(paymentInput);

            document.body.appendChild(form);
            form.submit();

            // await SubscriptionController.phonePe(response.data);
            // const res = await axios.post('/api/initiatePayment', response.data);
            // const res = await axios.post(process.env.NEXT_PUBLIC_API_URL + 'initiate-payment', response.data);
            // console.log("res**************", res);
            // if (res.data.success) {
            //     window.open(res.data.paymentUrl, '_self', 'noreferrer');                
            //     // window.open(res.data.paymentUrl);

            // } else {
            //     alert('Payment initiation failed. Please try again.');
            // }
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
                                        <Button variant="primary" size="sm" onClick={postPayment} disabled={totalDeviceAmount + totalEmployeeAmount === 0} >
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