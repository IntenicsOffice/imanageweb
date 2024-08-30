import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { companyRegister } from "../../../../_controllers/AuthController";

const Register = () => {

    const router = useRouter();
    const [companyName, setCompanyName] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [mobileId, setMobileId] = useState('createdwithweb');
    const [successMessage, setSuccessMessage] = useState('');
    const [errors, setErrors] = useState({ companyName: '', ownerName: '', mobile:'', email:'', apiError: '' });

    const validateForm = () => {
        let formIsValid = true;
        const newErrors = { companyName: '', ownerName: '', mobile:'', email:'', apiError: '' };
        // let newErrors = {};

        if (!companyName) {
            formIsValid = false;
            newErrors.companyName = 'Company Name is required';
        }

        if (!ownerName) {
            formIsValid = false;
            newErrors.ownerName = 'Owner Name is required';
        }
        
        if (!mobile) {
            formIsValid = false;
            newErrors.mobile = 'Mobile number is required';
        }
        
        if (!email) {
            formIsValid = false;
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            formIsValid = false;
            newErrors.email = 'Email is invalid';
        }
    
        setErrors(newErrors);
        return formIsValid;
    };
    
    const handleCompanyRegister = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        if (!validateForm()) return;

        const formData = {
            company_name:companyName,
            owner_name:ownerName, 
            mobile:mobile, 
            email:email, 
            mobile_id:mobileId,
        };

        try {
          const response = await companyRegister(formData);
          if (response.status === 200) {
                console.log('Register successful:', response);
                setSuccessMessage('Registration successful and login credentials have been sent to your email ID. Please click on the login button to proceed.'); // Show success message
                setCompanyName('');
                setOwnerName('');
                setMobile('');
                setEmail('');
                // router.push('/dashboard');
          }else{
            throw new Error(response.message || 'Registration failed');
          }
        } catch (error) {
            setErrors((prevErrors) => ({ ...prevErrors, apiError: error.message }));
            console.error('Login failed:', error);
        }
    };


    return (
        <>
            <form className="mb-3" onSubmit={handleCompanyRegister}>
                {successMessage && <div className="alert alert-success text-dark">{successMessage}</div>}
                {errors.apiError && <div className="alert alert-danger ">{errors.apiError}</div>}

                <div className="mb-3">
                    <label htmlFor="companyName" className="form-label">Company name</label>
                    <input type="text" className="form-control" id="company_name" name="company_name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} placeholder="Enter company name" autocomplete="true" />
                    {errors.companyName && <small className="text-danger">{errors.companyName}</small>}
                </div>

                <div className="mb-3">
                    <label htmlFor="ownerName" className="form-label">Owner name</label>
                    <input type="text" className="form-control" id="owner_name" name="owner_name" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} placeholder="Enter owner name" />
                    {errors.ownerName && <small className="text-danger">{errors.ownerName}</small>}
                </div>

                <div class="mb-3">
                    <label htmlFor="email" className="form-label">Mobile No.</label>
                    <input type="text" className="form-control" id="mobile" name="mobile" value={mobile} onChange={(e)=>setMobile(e.target.value)} placeholder="Enter mobile no" />
                    {errors.mobile && <small className="text-danger">{errors.mobile}</small>}
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="Enter email id" />
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>

                <div className="mb-3">
                    <button type="submit" className="btn btn-primary d-grid w-100">Sign up</button>
                </div>
            </form>
        </>
    )
}

export default Register;