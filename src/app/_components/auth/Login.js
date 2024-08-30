"use client"
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";
import { companyLogin } from "../../../../_controllers/AuthController";
// import { serialize } from 'cookie';
// import { cookies } from 'next/headers';


const Login = () => {

    const router = useRouter();
    const { pathname } = router;

    const [passwordVisible, setPasswordVisible] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '', apiError: '' });

    const validateForm = () => {
        let valid = true;
        const newErrors = { email: '', password: '', apiError: '' };

        if (!email) {
          newErrors.email = 'Email is required';
          valid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
          newErrors.email = 'Email is invalid';
          valid = false;
        }
    
        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        }
    
        setErrors(newErrors);
        return valid;
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        const formData = {
            email,
            password,
        };

        try {
          const response = await companyLogin(formData);
          if (response.status === 200) {
                console.log('Login successful:', response);
                router.push('/dashboard');
          }else{
            throw new Error(response.message || 'Login failed');
          }
        } catch (error) {
            setErrors((prevErrors) => ({ ...prevErrors, apiError: error.message }));
            console.error('Login failed:', error);
        }
    };

    return (
        <>
            {/* <form className="mb-3" onSubmit={handleLogin}> */}

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email or User Id</label>
                    <input type="text" className="form-control" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email or user id" required autoComplete="false"/>
                    {errors.email && <small className="text-danger">{errors.email}</small>}
                </div>
                <div className="mb-3 form-password-toggle">
                    <div className="d-flex justify-content-between">
                        <label className="form-label" htmlFor="password">Password</label>
                    </div>
                    <div className="input-group input-group-merge">
                        <input type={passwordVisible ? 'text' : 'password'} className="form-control" value={password} onChange={(e)=> setPassword(e.target.value)} name="password" placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;" aria-describedby="password" />
                        {/* <span className="input-group-text cursor-pointer"><i class="bi bi-eye-slash"></i></span> */}
                        <span className="input-group-text cursor-pointer" onClick={() => setPasswordVisible(!passwordVisible)}>
                            <i className={passwordVisible ? "bi bi-eye" : "bi bi-eye-slash"}></i>
                        </span>
                    </div>
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                    <div className="d-flex justify-content-end pt-2">
                        <a href="auth-forgot-password-basic.html"> <small>Forgot Password?</small> </a>
                    </div>
                </div>
                {errors.apiError && <div className="alert alert-danger">{errors.apiError}</div>}

                <div className="mb-3">
                    <button className="btn btn-primary d-grid w-100" type="button" onClick={handleLogin}>Sign in</button>
                </div>

            {/* </form>   */}
        </>
    )
}

export default Login;
