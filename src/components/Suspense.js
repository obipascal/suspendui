import React, { useState } from "react"

/**
 * A function component version of SuspendUI with more improve functionality.
 */
export function Suspense({ children, Loader = <span>Loading...</span>, Fallbackui = <span>Something went wrong</span>, fetch = () => {}, autoRefetch = false, delay = 30000 }) {
	const [suspend, setSuspend] = useState(true)
	const [hasError, setHasError] = useState(false)

	const cleanUp = () => {
		if (autoRefetch) {
			const interValid = setInterval(() => {
				setSuspend(true)
				setHasError(false)
			}, delay)

			return interValid
		}
		return null
	}
	useEffect(() => {
		// initally call the fetch if the suspend is true
		if (suspend) {
			// determin if the fetch methon contains
			// a promise chaining of then and catch
			if (typeof fetch === "function") {
				fetch()
					.then(res => setSuspend(false))
					.catch(error => setHasError(true))
			}
		}

		const timerId = cleanUp()
		return () => {
			if (timerId !== null) {
				window.clearInterval(timerId)
			}
		}
	}, [suspend, hasError])

	return (
		<React.Fragment>
			{suspend === true && hasError === false ? Loader : ""}
			{hasError === true && suspend === false ? Fallbackui : ""}
			{suspend === false && hasError == false ? children : ""}
		</React.Fragment>
	)
}
