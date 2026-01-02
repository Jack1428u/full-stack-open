import StaticLine from "./StaticLine"
export default function Statistics ({good,bad,neutral}){
    const total = good + bad + neutral;
    const average = total / 3;
    const perPositive =(good / total)*100;
    console.log("New total: ",total);
    if ((good === bad && bad === neutral)&& good === 0 ){
        return(
            <>
                <h1>Not statics to show</h1>
            </>
        )
    }
    return(
        <>
            <StaticLine text="Good" value={good}/>
            <StaticLine text="Bad" value={bad}/>
            <StaticLine text="Neutral" value={neutral}/>
            <StaticLine text= "Total" value={total}/>
            <StaticLine text= "Clicks Average" value={average.toFixed(2)}/>
            <StaticLine text="Positive(%) / Total: " value={perPositive.toFixed(2)}/>
        </>
    )
}