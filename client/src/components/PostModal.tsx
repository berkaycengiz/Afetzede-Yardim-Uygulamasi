import { useModalStore } from "../store/modalStore";
import CircleButton from "./CircleButton";
import { RxCross2 } from "react-icons/rx";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import SubmitButton from "./SubmitButton";
import { createPost } from "../services/createPostService";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export const PostModal = () => {
  const { isOpen, close } = useModalStore();

  const [post, setPost] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [description, setDescription] = useState("");
  const [error, setError] = useState('Description cannot be empty.');
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPost(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setDescription(value);
    if (value.trim().length > 0){
      setError('');
    }
    else {
      setError('Description cannot be empty.');
    }
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    setError('');
    try {
      await createPost(post, description.trim()!);
      close();
      navigate(0);
    }
    catch (err: any) {
      setError(err);
    } 
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    }
    else {
      setPost(null);
      setDescription("");
      if (preview) {
        URL.revokeObjectURL(preview);
        setPreview(null);
      }
      setError('Description cannot be empty.');
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      document.body.classList.remove('overflow-hidden');
    }
    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 overflow-hidden transition-opacity duration-300 ${isOpen ? 'opacity-100 visible bg-primary/60 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
      <div className={`bg-white p-6 rounded-xl w-full max-w-md relative transition-transform transform duration-300 origin-center ${isOpen ? 'scale-100' : 'scale-0'}`}>
        <CircleButton onClick={close} style={{position: "absolute", top: "20px", right: "20px", fontSize: "20px", scale: "0.8"}} disabled={isLoading}>
          <RxCross2></RxCross2>
        </CircleButton>
        <h2 className="text-2xl text-primary font-semibold mb-4">Share Post</h2>
        {error && <p className="text-error text-sm font-display mb-4">{error}</p>}
        <label htmlFor="postInput" className={`cursor-pointer block w-48 h-48 mx-auto mb-8 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}>
          <div className="w-full h-full border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition duration-300 ease-in-out">
            {preview ? (
              <img src={preview} className="w-full h-full rounded-md self-center object-cover" draggable="false" />
            ) : (
            <div className="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-md">Upload Photo</span>
            </div>
            )}
          </div>
        </label>
        <input
          ref={fileInputRef}
          id="postInput"
          type="file"
          accept=".png,.jpg,.jpeg"
          className="hidden"
          onChange={handleFileChange}
          disabled={isLoading}
        />
        <textarea
          placeholder="Description"
          maxLength={120}
          onChange={handleChange}
          value={description}
          className="w-full border-2 resize-none placeholder:text-secondary focus:outline-none focus:ring-1 focus:ring-primary text-secondary rounded-md p-2 h-24"
          disabled={isLoading}
        />
        <p className="text-secondary mb-4">{description.length}/120 characters</p>
        <div className="flex">
          <SubmitButton style={{width: "20%"}} onClick={handleConfirm} disabled={isLoading || !post || !description.trim()}>
            {isLoading ? (
              <AiOutlineLoading3Quarters className="animate-spin text-2xl" />
            ) : (
              'Post'
            )}
          </SubmitButton>
        </div>
      </div>
    </div>
  );
};