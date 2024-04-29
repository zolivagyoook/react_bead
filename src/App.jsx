// App.jsx
import React, { useState } from "react";
import HouseholdSalaryCalculator from "./components/HouseholdSalaryCalculator";
import { Button } from "@/components/ui/button";
import Window from "./Window";
import { Input } from "@/components/ui/input";

function App() {
  const [windows, setWindows] = useState([
    {
      name: "",
      salary: "",
      isUnder25: false,
      personalTaxAllowance: false,
      switch3: false,
      firstMarriageBenefit: false,
      selectedDate: null,
      marriageDate: null,
      dependents: 0,
      totalDependents: 0,
      beneficiaryDependents: 0,
      switch4: false,
      igen: false,
    },
  ]);

  const [activeWindow, setActiveWindow] = useState(0);

  const addWindow = () => {
    setWindows([...windows, { name: "", salary: "" }]);
    setActiveWindow(windows.length); // az új ablak lesz az aktív
  };

  const deleteWindow = (index) => {
    const newWindows = [...windows];
    newWindows.splice(index, 1);
    setWindows(newWindows);
    if (activeWindow >= newWindows.length) {
      setActiveWindow(newWindows.length - 1);
    }
  };
  const DEPENDENT_BENEFIT_1 = 10000;
  const DEPENDENT_BENEFIT_2 = 20000;
  const DEPENDENT_BENEFIT_3_PLUS = 33000;
  const SZJA = 0.15;
  const TB = 0.185;
  const FIRST_MARRIAGE_BENEFIT = 5000;
  const calculateNetSalary = (window) => {
    let netSalary = window.salary * (1 - SZJA - TB);
    if (window.isUnder25 && window.salary <= 499952) {
      netSalary = window.salary * (1 - TB);
    } else if (window.isUnder25 && window.salary > 499952) {
      netSalary =
        499952 * (1 - TB) + (window.salary - 499952) * (1 - SZJA - TB);
    }
    if (window.personalTaxAllowance) {
      const tax = window.salary * SZJA;
      netSalary += Math.min(tax, 77300);
    }
    if (window.firstMarriageBenefit && window.marriageDate) {
      const marriageDateObj = new Date(window.marriageDate);
      const now = new Date();
      const twoYearsAgo = new Date();
      twoYearsAgo.setFullYear(now.getFullYear() - 2);
      if (
        marriageDateObj > twoYearsAgo &&
        marriageDateObj < now &&
        marriageDateObj.getMonth() !== now.getMonth()
      ) {
        netSalary += FIRST_MARRIAGE_BENEFIT;
      }
    }

    let dependentBenefit = 0;
    if (window.beneficiaryDependents === 1) {
      dependentBenefit = DEPENDENT_BENEFIT_1 * window.totalDependents;
    } else if (window.beneficiaryDependents === 2) {
      dependentBenefit = DEPENDENT_BENEFIT_2 * window.totalDependents;
    } else if (window.beneficiaryDependents >= 3) {
      dependentBenefit = DEPENDENT_BENEFIT_3_PLUS * window.totalDependents;
    }

    netSalary += dependentBenefit;

    return netSalary;
  };

  return (
    <div className="text-foreground bg-gradient-to-b from-fuchsia-400">
      {/* <h1 className="font-bold m-3 text-xl">Bérkalkulátor alkalmazás</h1> */}
      <div className="flex justify-between">
        <div className="bigcard">
          <div className="flex space-x-4">
            {windows.map((window, index) => (
              <button
                key={index}
                onClick={() => setActiveWindow(index)}
                className="window-button"
              >
                {window.name ? window.name.slice(0, 12) : "Felhasználó"}
              </button>
            ))}

            {windows.length < 6 && (
              <button onClick={addWindow} className="add-window-button">
                +
              </button>
            )}
            {windows.length > 1 && (
              <button
                onClick={() => deleteWindow(activeWindow)}
                className="delete-window-button "
              >
                X
              </button>
            )}
          </div>
          {/* <h1 className="font-bold m-3 text-4xl relative bottom-8 relative right-4"></h1> */}
          {windows.map(
            (window, index) =>
              index === activeWindow && (
                <Window
                  key={index}
                  index={index}
                  name={window.name}
                  setName={(name) => {
                    const newWindows = [...windows];
                    newWindows[index].name = name;
                    setWindows(newWindows);
                  }}
                  salary={window.salary}
                  setSalary={(salary) => {
                    const newWindows = [...windows];
                    newWindows[index].salary = salary;
                    setWindows(newWindows);
                  }}
                  isUnder25={window.isUnder25}
                  setIsUnder25={(isUnder25) => {
                    const newWindows = [...windows];
                    newWindows[index].isUnder25 = isUnder25;
                    setWindows(newWindows);
                  }}
                  personalTaxAllowance={window.personalTaxAllowance}
                  setPersonalTaxAllowance={(personalTaxAllowance) => {
                    const newWindows = [...windows];
                    newWindows[index].personalTaxAllowance =
                      personalTaxAllowance;
                    setWindows(newWindows);
                  }}
                  switch3={window.switch3}
                  setSwitch3={(switch3) => {
                    const newWindows = [...windows];
                    newWindows[index].switch3 = switch3;
                    setWindows(newWindows);
                  }}
                  firstMarriageBenefit={window.firstMarriageBenefit}
                  setFirstMarriageBenefit={(firstMarriageBenefit) => {
                    const newWindows = [...windows];
                    newWindows[index].firstMarriageBenefit =
                      firstMarriageBenefit;
                    setWindows(newWindows);
                  }}
                  selectedDate={window.selectedDate}
                  setSelectedDate={(selectedDate) => {
                    const newWindows = [...windows];
                    newWindows[index].selectedDate = selectedDate;
                    setWindows(newWindows);
                  }}
                  marriageDate={window.marriageDate}
                  setMarriageDate={(marriageDate) => {
                    const newWindows = [...windows];
                    newWindows[index].marriageDate = marriageDate;
                    setWindows(newWindows);
                  }}
                  dependents={window.dependents}
                  setDependents={(dependents) => {
                    const newWindows = [...windows];
                    newWindows[index].dependents = dependents;
                    setWindows(newWindows);
                  }}
                  totalDependents={window.totalDependents}
                  setTotalDependents={(totalDependents) => {
                    const newWindows = [...windows];
                    newWindows[index].totalDependents = totalDependents;
                    setWindows(newWindows);
                  }}
                  beneficiaryDependents={window.beneficiaryDependents}
                  setBeneficiaryDependents={(beneficiaryDependents) => {
                    const newWindows = [...windows];
                    newWindows[index].beneficiaryDependents =
                      beneficiaryDependents;
                    setWindows(newWindows);
                  }}
                  switch4={window.switch4}
                  setSwitch4={(switch4) => {
                    const newWindows = [...windows];
                    newWindows[index].switch4 = switch4;
                    setWindows(newWindows);
                  }}
                />
              )
          )}
        </div>
        <div className="bigcard2">
          {/* <div className="text-foreground bg-gradient-to-b from-fuchsia-400"> */}
          {/* ... other components */}
          {/* <div className="bigcard2"> */}
          <table className="w-full">
            <thead className="w-full">
              <tr>
                <th className="text-rose-50">Név</th>
                <th className="text-rose-50">Fizetés</th>
              </tr>
            </thead>
            <tbody >
              {windows.map((window, index) => (
                <tr key={index}>
                  <td className="text-center text-rose-50">{window.name || "Felhasználó"}</td>
                  <td className="text-center text-rose-50">{Math.round(calculateNetSalary(window))}</td>
                </tr>
              ))}
            </tbody>

            <tfoot>
              <tr>
                <td className="text-center font-bold text-rose-50">Összesen</td>
                <td className="text-center font-bold text-rose-50" >
                  {windows.reduce(
                    (total, window) => total + Math.round(calculateNetSalary(window)),
                    0
                  )}
                </td>
              </tr>
            </tfoot>
          </table>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}

export default App;
