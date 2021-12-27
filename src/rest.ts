import Request from './helpers/request.ts'

export default abstract class Rest {
    protected readonly request: Request

    constructor(request: Request) {
        this.request = request
    }
}