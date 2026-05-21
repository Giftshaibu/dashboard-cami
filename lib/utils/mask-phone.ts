export function maskPhone(phone: string) {
  const digits = phone.replace(/\D/g, "")

  if (digits.length < 7) {
    return phone
  }

  const prefix = digits.slice(0, 3)
  const suffix = digits.slice(-3)

  return `${prefix}****${suffix}`
}
