"use client"
import DynamicSvgIcon from "../../components/svg/DynamicSvgIcon"
import { useEffect, useState } from "react"
import { useAppContext } from "@/context/AppContext"
import Alert from "@/components/Alert";
import LoadingBar from "@/components/LoadingBar";
import TimeDisplay from "@/components/TimeDisplay";

const Contact = () => {
  const contactBoxList = [
    {name: "LinkedIn", icon: "linkedin", href: "https://linkedin.com/in/rajalamdev"},
    {name: "Instagram", icon: "instagram", href: "https://instagram.com/rajalamdev"},
    {name: "Github", icon: "github", href: "https://github.com/rajalamdev"},
    {name: "Gmail", icon: "mail", href: "https://mail.google.com/mail/u/0/?view=cm&fs=1&tf=1&to=rajalamdev@gmail.com&subject=MISSED%20CALL%20EZTRADER&body=Just%20wanted%20to%20say%20hi%20:D"},
  ]

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [alertKey, setAlertKey] = useState(0); // agar alert selalu rerender
  const [errorFields, setErrorFields] = useState<{[key: string]: boolean}>({});
  const [shakeFields, setShakeFields] = useState<{[key: string]: boolean}>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validasi
    if (!name || !email || !message) {
      const newErrors = {
        name: !name,
        email: !email,
        message: !message,
      };

      setErrorFields(newErrors);
      setShakeFields(newErrors);
      setTimeout(() => setShakeFields({}), 500); // reset shake after animation
      setAlert({ type: "error", message: "All fields are required!" });
      setAlertKey(Date.now()); // trigger alert even if message is the same
      return;
    }
    setLoading(true); // pastikan loading bar muncul
    setAlertKey(Date.now());
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify({ name, email, message }),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      if (data.success) {
        setAlert({ type: "success", message: "Message sent successfully!" });
        setAlertKey(Date.now());
        // reset form
        setName(""); setEmail(""); setMessage("");
      } else {
        setAlert({ type: "error", message: data.error || "Failed to send message." });
        setAlertKey(Date.now());
      }
    } catch {
      setAlert({ type: "error", message: "Server error occurred." });
      setAlertKey(Date.now());
    }
    setLoading(false);
  };

  const context = useAppContext()

  return (
    <div className="h-full overflow-y-auto overflow-x-hidden px-6 sm:px-12 flex flex-col relative">
        <div className="flex h-20 gap-4 top-0 left-0 mb-8">
          <div className="bg-accent w-1 h-full"></div>
          <div className="self-end">
            <h3 className="text-xl font-semibold text-secondary mb-1">CONTACT</h3>
            <p className="text-base">feel-free-to-contact-me 🥸</p>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row lg:flex-wrap flex-1">
          <div className="flex-1 flex justify-center items-center">
            <form className="space-y-6 max-w-[400px] w-full" onSubmit={handleSubmit}>
              <label htmlFor="name" className="relative w-full block">
                <span className="absolute bg-primary -top-[10px] px-2 left-2 peer z-10 cursor-pointer">_name</span>
                <input type="text" name="name" id="name" className={`text-secondary outline-none bg-transparent border ${errorFields.name ? 'border-red-500' : 'border-tertiary'} py-2 px-4 rounded w-full focus:scale-x-105 focus:border-accent transition-transform duration-300 ${shakeFields.name ? 'animate-shake' : ''}`} autoComplete="off"  placeholder="Your Name" value={name} onChange={e => { setName(e.target.value); if (errorFields.name) setErrorFields(prev => ({ ...prev, name: false })); }} />
             </label>
              <label htmlFor="email" className="relative w-full block">
                <span className="absolute bg-primary -top-[10px] px-2 left-2 peer z-10 cursor-pointer">_email</span>
                <input type="email" name="email" id="email" className={`text-secondary outline-none bg-transparent border ${errorFields.email ? 'border-red-500' : 'border-tertiary'} py-2 px-4 rounded w-full focus:scale-x-105 focus:border-accent transition-transform duration-300 ${shakeFields.email ? 'animate-shake' : ''}`} autoComplete="off" placeholder="yourmail@gmail.com" value={email} onChange={e => { setEmail(e.target.value); if (errorFields.email) setErrorFields(prev => ({ ...prev, email: false })); }} />
              </label>
              <label htmlFor="message" className="relative w-full block">
                <span className="absolute bg-primary -top-[10px] px-2 left-2 peer z-10 cursor-pointer">_message</span>
                <textarea name="message" id="message" className={`min-h-[100px] max-h-[120px] text-secondary outline-none bg-transparent border ${errorFields.message ? 'border-red-500' : 'border-tertiary'} p-2 rounded w-full focus:scale-x-105 focus:border-accent transition-transform duration-300 px-4 ${shakeFields.message ? 'animate-shake' : ''}`} placeholder="Type your message here..." value={message} onChange={e => { setMessage(e.target.value); if (errorFields.message) setErrorFields(prev => ({ ...prev, message: false })); }} />
              </label>
              <button type="submit" className="center hover:ring-2 ring-accent ring-offset-4 active:ring-offset-1 ring-offset-primary text-primary transition-all font-medium py-2 px-4 bg-accent rounded" disabled={loading}>{loading ? (<><span>Sending</span><span className="sending-dots"></span></>) : "send-message"}</button>
            </form>
          </div>

          <div className="h-full flex flex-row lg:flex-col lg:w-4 items-center lg:px-8 space-x-4 lg:space-x-0 my-8 lg:my-0">
            <div className="w-full lg:w-[2px] h-[2px] bg-line lg:flex-1"></div>
            <p className="text-xl font-semibold py-2">OR</p>
            <div className="w-full lg:w-[2px] h-[2px] bg-line lg:flex-1"></div>
          </div>
          <div className="flex-1 flex gap-8 justify-center flex-wrap content-center">
            {contactBoxList.map(contact => {
              return (
                <a target="_blank" href={contact.href} className="group cursor-link lg:w-56 w-64 lg:h-[120px] h-[130px]" key={contact.name}>
                  <div className="bg-accent buttonColorful w-full h-full rounded-br-3xl rounded-tl-3xl flex justify-center items-center relative group-hover:-translate-y-4 transition-all duration-300">
                    <DynamicSvgIcon name={contact.icon} className="w-10 fill-white" />
                    <p className="absolute text-secondary bottom-0 opacity-0 group-hover:opacity-100 group-hover:-bottom-8 -z-10 transition-all duration-300">{contact.name}</p>
                  </div>
                </a>
              )
            })}
          </div>
        </div>
        
        <div className="flex h-20 gap-4 mt-8 justify-end">
          <div className="self-center">
            <TimeDisplay />
          </div>
          <div className="bg-accent w-1 h-full"></div>
        </div>
        <LoadingBar show={loading} />
        {alert && ( 
          <Alert
            key={alertKey}
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
            showLoadingBar={true} // Selalu true
            setAlert={setAlert}
          />
        )}
    </div>
  )
}

export default Contact