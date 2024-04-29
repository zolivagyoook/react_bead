  import React, { useState } from 'react';
  import { Input } from "@/components/ui/input"
  import { Slider } from "@/components/ui/slider"
  import { Switch } from "@/components/ui/switch"
  import { DatePickerDemo } from './calendar';

  function Window({ index,igen, name,beneficiaryDependents,setBeneficiaryDependents,switch4,setSwitch4,totalDependents,setTotalDependents, firstMarriageBenefit, setFirstMarriageBenefit,isUnder25, setIsUnder25,personalTaxAllowance,setPersonalTaxAllowance, setName, salary, setSalary }) {
    
    const SZJA = 0.15;
    const TB = 0.185;
    const FIRST_MARRIAGE_BENEFIT = 5000;

    
    // const [isUnder25, setIsUnder25] = useState(false);
    // const [personalTaxAllowance, setPersonalTaxAllowance] = useState(false);
    // const [switch3, setSwitch3] = useState(false);
    // const [firstMarriageBenefit, setFirstMarriageBenefit] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null); 
    const [marriageDate, setMarriageDate] = useState(null);
    const [dependents, setDependents] = useState(0);
    // const [totalDependents, setTotalDependents] = useState(0);
    // const [beneficiaryDependents, setBeneficiaryDependents] = useState(0);
    // const [switch4, setSwitch4] = useState(false);
    
    const DEPENDENT_BENEFIT_1 = 10000;
    const DEPENDENT_BENEFIT_2 = 20000;
    const DEPENDENT_BENEFIT_3_PLUS = 33000;
    
    const handleBeneficiaryDependentsChange = (e) => {
      const value = parseInt(e.target.value);
      if (value >= 0 && value <= 3 && value <= totalDependents) {
        setBeneficiaryDependents(value);
      }
    };

    let netSalary = salary * (1 - SZJA - TB);
    if (isUnder25 && salary <= 499952) {
      netSalary = salary * (1 - TB);
    } else if (isUnder25 && salary > 499952) {
      netSalary = (499952 * (1 - TB)) + ((salary - 499952) * (1 - SZJA - TB));
    }
    if (personalTaxAllowance) {
      const tax = salary * SZJA;
      netSalary += Math.min(tax, 77300);
    }
      if (firstMarriageBenefit && marriageDate) {
        const marriageDateObj = new Date(marriageDate);
        const now = new Date();
        const twoYearsAgo = new Date();
        twoYearsAgo.setFullYear(now.getFullYear() - 2);
        if ((marriageDateObj > twoYearsAgo && marriageDateObj < now && marriageDateObj.getMonth() !== now.getMonth())) {
          netSalary += FIRST_MARRIAGE_BENEFIT;
          
        }
      }
      

      let dependentBenefit = 0;
      if (beneficiaryDependents === 1) {
        dependentBenefit = DEPENDENT_BENEFIT_1 * totalDependents;
      } else if (beneficiaryDependents === 2) {
        dependentBenefit = DEPENDENT_BENEFIT_2 * totalDependents;
      } else if (beneficiaryDependents >= 3) {
        dependentBenefit = DEPENDENT_BENEFIT_3_PLUS * totalDependents;
      }
    
      netSalary += dependentBenefit;

    return (
      <div key={index}  style={{ position: 'relative', top: '-30px' }}>
        <label className="block">
          <h1 className="font-bold m-1 text-4xl">{name ? name.slice(0, 12) : "Felhasználó"} oldala</h1> <br></br>
          Családtag neve:
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="border-2 border-rose-300 rounded-md p-2 mt-2 w-full bg-rose-100" 
            placeholder="Add meg a nevet"
          />
        </label>
        <label className="block mt-4">
          Brutó bér:
          <input 
            type="number" 
            value={salary} 
            onChange={(e) => setSalary(e.target.value)} 
            className="border-2 border-rose-300 rounded-md p-2 mt-2 w-full bg-rose-100" 
            placeholder="Add meg az összeget"
          />
          <div className="flex justify-center">
          <input 
              type="range" 
              min="0" 
              max="1000000" 
              value={salary} 
              onChange={(e) => setSalary(e.target.value)} 
              className="rounded-lg appearance-none bg-rose-100 h-1 w-4/5 mt-8" 
          />
          </div>
          <div className="flex justify-center mt-8">
              <button className="numbut" onClick={() => setSalary(salary * 0.95)}>-5%</button>
              <button className="numbut" onClick={() => setSalary(salary * 0.99)}>-1%</button>
              <button className="numbut" onClick={() => setSalary(salary * 1.01)}>+1%</button>
              <button className="numbut" onClick={() => setSalary(salary * 1.05)}>+5%</button>
          </div>
          <div className="mt-4">
            <div className="flex items-center mb-4 ml-4">
              <input type="checkbox" checked={isUnder25} onChange={() => setIsUnder25(!isUnder25)} /> <span className="ml-2">25 éven aluliak SZJA kedvezménye</span>
            </div>
            <div className="flex items-center mb-4 ml-4">
              <input type="checkbox"  checked={personalTaxAllowance} onChange={() => setPersonalTaxAllowance(!personalTaxAllowance)} /> <span className="ml-2">Személyi adókedvezmény</span>
            </div>
            <div className="flex items-center mb-4 ml-4">
              <input type="checkbox" checked={firstMarriageBenefit} onChange={() => setFirstMarriageBenefit(!firstMarriageBenefit)} /> <span className="ml-2">Első házasok kedvezménye</span>
              
              {firstMarriageBenefit && marriageDate ? (
            (() => {
              const marriageDateObj = new Date(marriageDate);
              const now = new Date();
              const twoYearsAgo = new Date();
              twoYearsAgo.setFullYear(now.getFullYear() - 2);
              if (marriageDateObj > twoYearsAgo && marriageDateObj < now && marriageDateObj.getMonth() !== now.getMonth()) {
                return <div className="ml-4 font-bold text-emerald-300">Jogosultak </div>;
              } else {
                return <div className="ml-4 font-bold text-red-400">Nem jogosultak</div>;
              }
            })()
          ) : ( 
            <div style={{ color: 'red' }}></div>
          )}
            </div>
            <div className="flex items-center  ml-4">
          {firstMarriageBenefit && <DatePickerDemo setDate={setMarriageDate} />}
            </div>
            <div className="flex items-center mb-4 ml-4">
            <label>
            
            
              <input 
            type="checkbox" 
            className="mr-2"
            checked={switch4} 
            onChange={() => setSwitch4(!switch4)} 
              />
              
              Családi kedvezmény
            </label>
            </div>
            <div className="flex items-center">
            {switch4 && (
          <div className="ml-4">
            <label className="">
              Összesen:
              <input 
                type="number" 
                min="0" 
                value={totalDependents} 
                className="ml-4 bg-rose-100 rounded-md p-2 mt-2 w-12 border-rose-300 "
                onChange={(e) => setTotalDependents(parseInt(e.target.value))} 
              />
            </label>
            <label className="ml-4">
              Segélyezett:
              <input 
                type="number" 
                min="0" 
                max="3" 
                value={beneficiaryDependents} 
                className="ml-4 bg-rose-100 rounded-md p-2 mt-2 w-12 "
                onChange={handleBeneficiaryDependentsChange} 
              />
            </label>
          </div>
        )}
            </div>
          </div>

          <div className="flex flex-col items-center mt-10">
          <div>Számított nettó bér</div>
          <div className="mt-6 bg-fuchsia-700 text-primary-foreground rounded-lg p-4 text-xl">{Math.round(netSalary)} Ft</div>
        </div>
        </label>   
      </div>
    );
  }

  export default Window;
