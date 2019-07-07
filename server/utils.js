const Fraction = class {
  constructor(input) {
    if (!input) {
      this.value = {numerator: 1, denominator: 1}
      this.left = new Fraction('0/1')
      this.right = new Fraction('1/0')
    } else {
      let [numerator, denominator] = input.split('/')
      numerator = +numerator
      denominator = +denominator
      this.value = {numerator, denominator}
      // if (
      //   (this.numerator === 1 && this.denominator === 0) ||
      //   (this.numerator === 0 && this.denominator === 1)
      // ) {
      // } else {
      //   const findNode = this.findLeftAndRight(new Fraction())
      // }
    }
  }
  insertLeft() {
    const node = this.findLeftAndRight(new Fraction())
    return node.add(node.left)
  }

  insertRight() {
    const node = this.findLeftAndRight(new Fraction())
    return node.add(node.right)
  }

  findLeftAndRight(rootNode) {
    let currNode = rootNode
    console.log('this :', this)
    console.log('currNode :', currNode)
    console.log('this.e(currNode) :', this.e(currNode))
    console.log('this.l(currNode) :', this.l(currNode))
    while (!this.e(currNode)) {
      if (this.l(currNode)) {
        const temp = currNode
        currNode = currNode.add(currNode.left)
        currNode.right = temp
        currNode.left = temp.left
      } else {
        const temp = currNode
        currNode = currNode.add(currNode.right)
        currNode.left = temp
        currNode.right = temp.right
      }
    }
    return currNode
  }
  // insertLast() {
  //   return new Fraction(`${this.value.numerator + 1}/${this.value.denominator}`)
  // }

  // insertFirst() {
  //   return new Fraction(`${this.value.numerator}/${this.value.denominator + 1}`)
  // }

  add(anotherFraction) {
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

  l(anotherNode) {
    return (
      this.value.numerator * anotherNode.value.denominator <
      anotherNode.value.numerator * this.value.denominator
    )
  }

  e(anotherNode) {
    return (
      this.value.numerator * anotherNode.value.denominator ===
      anotherNode.value.numerator * this.value.denominator
    )
  }

  // static insertMiddleStatic(first, second) {
  //   const firstFraction = new Fraction(first)
  //   const secondFraction = new Fraction(second)
  //   return firstFraction.insertMiddle(secondFraction)
  // }
}

module.exports = {Fraction}

// console.log('object', new Fraction('2/7').findLeftAndRight(new Fraction()).right)
