const Fraction = class {
  constructor(input) {
    if (!input) {
      this.value = {numerator: 1, denominator: 1}
    } else {
      let [numerator, denominator] = input.split('/')
      numerator = +numerator
      denominator = +denominator
      this.value = {numerator, denominator}
    }
  }

  insertLast() {
    return new Fraction(`${this.value.numerator + 1}/${this.value.denominator}`)
  }

  insertFirst() {
    return new Fraction(`${this.value.numerator}/${this.value.denominator + 1}`)
  }

  insertMiddle(anotherFraction) {
    return new Fraction(
      `${this.value.numerator + anotherFraction.value.numerator}/${this.value
        .denominator + anotherFraction.value.denominator}`
    )
  }

  toString() {
    return `${this.value.numerator}/${this.value.denominator}`
  }

  toFloat() {
    return this.value.numerator / this.value.denominator
  }

  static insertMiddleStatic(first, second) {
    const firstFraction = new Fraction(first)
    const secondFraction = new Fraction(second)
    return firstFraction.insertMiddle(secondFraction)
  }
}

module.exports = {Fraction}
