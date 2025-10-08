export interface Filter{
    startDate:string,
    numberOfRows:number,
    pageNumber:number,
    endDate:string,
    status:'complted'|'missing'|'incomplete'|'all'
}