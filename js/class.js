class Weather{
    condition;
    icon;
    color;
    constructor(params){
        this.condition = params.condition;
        this.icon = params.icon;
        this.color = params.color;
    }
}





class Day{
    time;
    date;
    forecast;
    constructor(params){
        this.time = params.time;
        this.date = params.date;
        this.forecast = params.forecasts;
    }
}