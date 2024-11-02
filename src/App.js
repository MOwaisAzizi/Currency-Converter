import React, { useState } from "react";
import { useEffect } from "react";

export default function App(){

const [amount,setamount] = useState(1)
const[fromCur,setfromCur] = useState("EUR")
const[toCur,setToCur] = useState("USD")
const[converter,setConverter] = useState('')
const[isLoading,setIsLoading] = useState(false)
// `https://api.frankfurter.app/latest?amount=10&from=GBP&to=USD`


useEffect(function(){
async function conver(){
  setIsLoading(true)
  const res = await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCur}&to=${toCur}`)
  const data = await res.json()
  setIsLoading(false)
  setConverter(data.rates[toCur]);
}

if(fromCur==toCur ) return setConverter(amount)
conver()
},[amount,toCur,fromCur])

  return(
  <div className="container">
      <div className="center">
  <input type="text" placeholder="Amount" value={amount} onChange={(e)=>setamount(Number(e.target.value))}  disabled={isLoading}/>
    <select onChange={(e)=>setfromCur(e.target.value)} disabled={isLoading} value={fromCur}>
      <option value='USD'>USD</option>
      <option value='EUR'>EUR</option>
      <option value='GBP'>GPB</option>
      <option value='CAD'>CAD</option>
    </select>
  <span>to</span>
    <select onChange={(e)=>setToCur(e.target.value)} value={toCur} disabled={isLoading}>
      <option value='USD'>USD</option>
      <option value='EUR'>EUR</option>
      <option value='GBP'>GPB</option>
      <option value='CAD'>CAD</option>
    </select>
  <p>OUTPUT : {converter} {toCur}</p>
  </div>
  </div>
)
}
