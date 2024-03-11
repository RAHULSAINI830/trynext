import React, { useState, useEffect, useRef } from 'react'
function Stepper  ({ steps, currentStepNumber ,setCurrentStep }) {
	const [stepperSteps, setStep] = useState([]);
	const stepsStateRef = useRef();
	useEffect(() => {
		const stepsState = steps.map((step, index) => {
			const stepObj = {};
			stepObj.description = step;
			stepObj.completed = false;
			stepObj.highlighted = index === 0 ? true : false;
			stepObj.selected = index === 0 ? true : false;
			return stepObj;
		});
		stepsStateRef.current = stepsState;
		const currentSteps = updateStep(currentStepNumber - 1, stepsState)
		setStep(currentSteps)
	}, []);
	useEffect(() => {
		const currentSteps = updateStep(currentStepNumber - 1, stepsStateRef.current)
		setStep(currentSteps)
	}, [currentStepNumber]);
	function updateStep(stepNumber, steps) {
		const newSteps = [...steps];
		let stepCounter = 0;
		while (stepCounter < newSteps.length) {
			//current step
			if (stepCounter === stepNumber) {
				newSteps[stepCounter] = {
					...newSteps[stepCounter],
					highlighted: true,
					selected: true,
					completed: false
				};
				stepCounter++;
			}
			// Past step
			else if (stepCounter < stepNumber) {
				newSteps[stepCounter] = {
					...newSteps[stepCounter],
					highlighted: false,
					selected: true,
					completed: true
				};
				stepCounter++;
			}
			// Future steps
			else {
				newSteps[stepCounter] = {
					...newSteps[stepCounter],
					highlighted: false,
					selected: false,
					completed: false
				}
				stepCounter++;
			}
		}
		return newSteps
	}
	const stepsDisplay = stepperSteps.map((step, index) => {
		return (
			<div key={index}
				className={index !== stepperSteps.length - 1 ? "w-1/2 flex items-center" : "flex items-center"} >
				<div className="relative flex flex-col items-center text-teal-600 cursor-pointer" onClick={()=>{
					setCurrentStep(index+1)
				}}>
					<div className={`rounded-full transition duration-500 ease-in-out border border-blue-600 h-12 w-12 flex items-center justify-center py-3  ${step.selected ? "bg-blue-500 text-white font-bold" : ""}`}>
						{step.completed ? <span className="text-white font-bold text-xl">✓</span> : index + 1}
					</div>
					<div className={`absolute top-0 hidden sm:block  text-center mt-16 w-32 text-xs font-medium uppercase ${step.highlighted ? "text-gray-900" : "text-gray-400"}`}> {step.description}	</div>
				</div>
				<div className="flex-auto border-t transition duration-500 ease-in-out border-blue-600 "> </div>
			</div>
		)
	})
	return (
		<div className="mx-4 p-4 flex justify-center items-center">
			{stepsDisplay}
		</div>
	)
}
export default Stepper
