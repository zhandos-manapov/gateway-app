export class DeleteResponseDto {
  affected: number

  success: boolean

  message: string

  constructor(success: boolean, message: string, affected: number) {
    this.success = success
    this.message = message
    this.affected = affected
  }

  toString() {
    return JSON.stringify({
      affected: this.affected,
      success: this.success,
      message: this.message
    })
  }
}
