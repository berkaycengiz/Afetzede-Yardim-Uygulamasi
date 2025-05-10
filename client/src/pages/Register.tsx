import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../services/registerService";
import SubmitButton from "../components/SubmitButton";
import Navbar from "../layouts/Navbar";
import { BsArrowRight, BsArrowLeft } from "react-icons/bs";
import CircleButton from "../components/CircleButton";
import { uploadProfilePic } from "../services/uploadService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import DropdownMenu from "../components/DropdownMenu";
import { FaChevronDown } from "react-icons/fa";
import { sendCode } from "../services/authSendCode";
import { verifyCode } from "../services/authVerifyCode";

const Register: React.FC = () => {
  const [error, setError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState<string>("");
  const [bloodType, setBloodType] = useState("");
  const [address, setAddress] = useState("");
  const [emergencyContact, setEmergencyContact] = useState("");
  const [gender, setGender] = useState("");
  const [isDisabled, setIsDisabled] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const [activeCard, setActiveCard] = useState<1 | 2 | 3 | 4>(1);

  const navigate = useNavigate();

  const setters: { [key: string]: (value: string) => void } = {
  firstName: setFirstName,
  lastName: setLastName,
  phone: setPhone,
  otp: setOtp,
  dateOfBirth: setDateOfBirth,
  address: setAddress,
  emergencyContact: setEmergencyContact,
  password: setPassword,
  confirmPassword: setConfirmPassword,
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePic(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    const setter = setters[name];
    if(name !== 'address'){
      const value = event.target.value.trim();
      if (setter) {
        setter(value);
        setError("");
      }
      if (name === 'password' && value.length < 6) {
        setError('Şifre en az 6 karakter olmalı.');
        return
      }
      else if(name === 'confirmPassword' && value !== password){
        setError('Şifreler eşleşmiyor!');
      }
    }
    else{
      const value = event.target.value;
      if (setter) {
        setter(value);
        setError("");
      }
    }
  };

  const handleSendCode = async () => {
    setIsLoading(true);
    try{
      await sendCode(phone);
      setIsSent(true);
      setIsLoading(false);
    }
    catch (err: any) {
      setIsLoading(false);
      setIsSent(false);
      setError(err);
    }
  }

  const handleSubmitCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try{
      await verifyCode(phone, otp);
      setIsVerified(true);
      setIsLoading(false);
    }
    catch (err: any) {
      setIsLoading(false);
      setIsVerified(false);
      setError(err);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor!');
      return;
    }
    try {
      const user = await registerUser(firstName, lastName, phone, password, dateOfBirth, address, emergencyContact, bloodType, gender, isDisabled);
      await uploadProfilePic(profilePic, user._id);
      navigate("/login");
    } 
    catch (err: any) {
      setIsLoading(false);
      setError(err);
    }
  };

  return (
    <div className="min-h-screen bg-background overflow-hidden">
      <Navbar></Navbar>
      <div className="flex justify-center gap-4 mt-4">
        <div className={`rounded-full text-3xl border-8 duration-500 ${activeCard === 1 ? 'border-highlight' : 'border-secondary/50'}`}></div>
        <div className={`rounded-full text-3xl border-8 duration-500 ${activeCard === 2 ? 'border-highlight' : 'border-secondary/50'}`}></div>
        <div className={`rounded-full text-3xl border-8 duration-500 ${activeCard === 3 ? 'border-highlight' : 'border-secondary/50'}`}></div>
        <div className={`rounded-full text-3xl border-8 duration-500 ${activeCard === 4 ? 'border-highlight' : 'border-secondary/50'}`}></div>
      </div>
      <div className="flex flex-col relative items-center mt-4">
        <form onSubmit={handleSubmitCode} className="flex flex-col gap-4 bg-white p-6 rounded-2xl absolute shadow-secondary shadow-2xl w-97 transition-all duration-1000" style={{
            transform: `translateX(${activeCard === 1 ? '0%' : '-200%'})`,
            opacity: activeCard === 1 ? 1 : 0,
            pointerEvents: activeCard === 1 ? 'auto' : 'none',
          }}>
          <h2 className="text-xl self-center font-display font-bold text-highlight mb-2">Kayıt Ol</h2>
          {error && <p className="text-error text-sm">{error}</p>}
          {isVerified && <p className="text-success text-sm">Doğrulama Başarılı!</p>}
          <input
            type="tel"
            name="phone"
            placeholder="Telefon (XXX XXX XX XX)"
            value={phone}
            onChange={handleChange}
            maxLength={10}
            spellCheck={false}
            className="w-full px-3 py-2 border placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-secondary rounded mb-2"
          />
          {!isSent && (
            <>
            <SubmitButton onClick={handleSendCode} disabled={isLoading}>
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
              ) : (
                'KOD GÖNDER'
              )}
            </SubmitButton>
            </>
          )}
          {isSent && (
            <>
              <input
                type="text"
                name="otp"
                placeholder="KODU GİRİNİZ"
                value={otp}
                onChange={handleChange}
                maxLength={6}
                spellCheck={false}
                className="w-full px-3 py-2 border placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-secondary rounded mb-2"
              />
              <SubmitButton disabled={isVerified}>
                {isVerified ? (
                  'DOĞRULAMA BAŞARILI'
                ) : (
                  'DOĞRULA'
                )}
              </SubmitButton>
            </>
          )}
          <Link to="/login" className="underline text-primary mb-2 font-display hover:text-hover transition">
          Zaten kayıtlı mısın?</Link>
          <CircleButton disabled={!isVerified} onClick={() => setActiveCard(2)}><BsArrowRight className="text-2xl"></BsArrowRight></CircleButton>
        </form>
        <form className="flex flex-col gap-4 bg-white p-6 rounded-2xl absolute shadow-secondary shadow-2xl w-97 transition-all duration-1000" style={{
            transform: activeCard === 2 ? 'translateX(0%)': activeCard === 1 ? 'translateX(200%)': 'translateX(-200%)',
            opacity: activeCard === 2 ? 1 : 0,
            pointerEvents: activeCard === 2 ? 'auto' : 'none',
          }}>
          <h2 className="text-xl self-center font-display font-bold text-highlight mb-2">Kayıt ol</h2>
          {error && <p className="text-error text-sm">{error}</p>}
          <input
            type="text"
            name="firstName"
            placeholder="Ad"
            value={firstName}
            onChange={handleChange}
            maxLength={20}
            spellCheck={false}
            className="w-full px-3 py-2 border placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-secondary rounded mb-2"
          />
          <input
            type="text"
            name="lastName"
            placeholder="Soyad"
            value={lastName}
            onChange={handleChange}
            maxLength={20}
            spellCheck={false}
            className="w-full px-3 py-2 border placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-secondary rounded mb-2"
          />
          <input
            type="password"
            name="password"
            placeholder="Parola"
            value={password}
            onChange={handleChange}
            spellCheck={false}
            className="w-full px-3 py-2 border placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-secondary rounded mb-2"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Parola Doğrula"
            value={confirmPassword}
            onChange={handleChange}
            spellCheck={false}
            className="w-full px-3 py-2 border placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-secondary rounded mb-2"
          />
          <div className="flex gap-16 self-center">
            <CircleButton onClick={() => setActiveCard(1)}><BsArrowLeft className="text-2xl"></BsArrowLeft></CircleButton>
            <CircleButton onClick={() => setActiveCard(3)}><BsArrowRight className="text-2xl"></BsArrowRight></CircleButton>
          </div>
        </form>
        <form className="flex flex-col gap-4 bg-white p-6 rounded-2xl absolute shadow-secondary shadow-2xl w-97 transition-all duration-1000" style={{
            transform: activeCard === 3 ? 'translateX(0%)': activeCard === 2 ? 'translateX(200%)': 'translateX(-200%)',
            opacity: activeCard === 3 ? 1 : 0,
            pointerEvents: activeCard === 3 ? 'auto' : 'none',
          }}>
          <h2 className="text-xl self-center font-display font-bold text-highlight mb-2">Bilgiler</h2>
          <input
            type="date"
            name="dateOfBirth"
            value={dateOfBirth}
            onChange={handleChange}
            spellCheck={false}
            className="w-full px-3 py-2 border placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-secondary rounded mb-2"
          />
          <input
            type="text"
            name="address"
            placeholder="Adres"
            value={address}
            onChange={handleChange}
            spellCheck={false}
            className="w-full px-3 py-2 border placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-secondary rounded mb-2"
          />
          <input
            type="tel"
            name="emergencyContact"
            placeholder="Yakınınızın Numarası (XXX XXX XX XX)"
            value={emergencyContact}
            onChange={handleChange}
            maxLength={10}
            spellCheck={false}
            className="w-full px-3 py-2 border placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-secondary rounded mb-2"
          />
          <DropdownMenu
            items={[
              { label: 'A+', onClick: () => setBloodType('A+') },
              { label: 'A-', onClick: () => setBloodType('A-') },
              { label: 'B+', onClick: () => setBloodType('B+') },
              { label: 'B-', onClick: () => setBloodType('B-') },
              { label: 'AB+', onClick: () => setBloodType('AB+') },
              { label: 'AB-', onClick: () => setBloodType('AB-') },
              { label: '0+', onClick: () => setBloodType('0+') },
              { label: '0-', onClick: () => setBloodType('0-') }
            ]}
            trigger={
              <div className="w-full px-3 py-2 border flex justify-between items-center placeholder:text-secondary hover:text-highlight text-secondary rounded mb-2 transition">
                {bloodType ? bloodType : "Kan Grubu"} <FaChevronDown></FaChevronDown>
              </div>
            }
          />
          <DropdownMenu
            items={[
              { label: 'Erkek', onClick: () => setGender('Male') },
              { label: 'Kadın', onClick: () => setGender('Female') },
              { label: 'Diğer', onClick: () => setGender('Other') }
            ]}
            trigger={
              <div className="w-full px-3 py-2 border flex justify-between items-center placeholder:text-secondary hover:text-highlight text-secondary rounded mb-2 transition">
                {gender ? gender : "Cinsiyet"} <FaChevronDown></FaChevronDown>
              </div>
            }
          />
          <DropdownMenu
            items={[
              { label: 'Evet', onClick: () => setIsDisabled('Yes') },
              { label: 'Hayır', onClick: () => setIsDisabled('No') }
            ]}
            trigger={
              <div className="w-full px-3 py-2 border flex justify-between items-center placeholder:text-secondary hover:text-highlight text-secondary rounded mb-2 transition">
                {isDisabled ? isDisabled : "Engellilik Durumu"} <FaChevronDown></FaChevronDown>
              </div>
            }
          />
          <div className="flex gap-16 self-center">
            <CircleButton onClick={() => setActiveCard(2)}><BsArrowLeft className="text-2xl"></BsArrowLeft></CircleButton>
            <CircleButton onClick={() => setActiveCard(4)}><BsArrowRight className="text-2xl"></BsArrowRight></CircleButton>
          </div>
        </form>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white p-6 rounded-2xl absolute -translate-y- shadow-secondary shadow-2xl w-97 transition-all duration-1000" style={{
            transform: `translateX(${activeCard === 4 ? '0%' : '200%'})`,
            opacity: activeCard === 4 ? 1 : 0,
            pointerEvents: activeCard === 4 ? 'auto' : 'none',
          }}>
          <h2 className="text-xl self-center font-display font-bold text-primary mb-2">Profil Resmi</h2>
          {error && <p className="text-error text-sm mb-4">{error}</p>}
          <label htmlFor="profilePicInput" className="cursor-pointer block w-36 h-36 mx-auto">
            <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition duration-300 ease-in-out">
              {preview ? (
                <img src={preview} className="w-34 h-34 rounded-full self-center object-cover" draggable="false"/>
              ) : (
                <div className="text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs">Fotoğraf Yükle</span>
                </div>
              )}
            </div>
          </label>
          <input  
            id="profilePicInput"
            type="file"
            accept=".png,.jpg,.jpeg"
            className="hidden"
            onChange={handleFileChange}
          />
          <CircleButton onClick={() => setActiveCard(3)}><BsArrowLeft className="text-2xl"></BsArrowLeft></CircleButton>
          <SubmitButton disabled={isLoading} >
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-2xl"/>
            ) : (
              'KAYIT OL'
            )}
          </SubmitButton>
        </form>
      </div>
    </div>
  );
};

export default Register;
