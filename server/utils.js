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

  // insertBetween(node) {
  //   // if (this.e(node))
  //   let smallNode = this.l(node) ? this : node
  //   let bigNode = node.e(this) ? node : this
  //   let left = bigNode.insertLeft()
  //   return left.e(smallNode) ? left.add(smallNode) : smallNode
  // }

  // first input - targetId, second - nextLine(prevLine)
  static insertBetween(input1, input2) {
    const node1 = new Fraction(input1)
    const node2 = new Fraction(input2)
    const smallNode = node1.l(node2) ? node1 : node2
    const bigNode = node1.l(node2) ? node2 : node1
    const left = bigNode.insertLeft()
    if (smallNode.l(left)) return left
    const right = smallNode.insertRight()
    if (right.l(bigNode)) return right
    throw 'Its easier to kill yourself than make it work((('

    // return left.e(smallNode) ? smallNode.add(bigNode) : left

    // if (node2 > node1) {
    //   const left = node2.insertLeft()
    //   return left.e(node1) ? node1.add(node2) : left
    // } else {
    //   const right = node1.insertRight()
    //   return right.e(node2) ? node2.add(node1) : right
    // }
    // const smallNode = node1.l(node2) ? node1 : node2
    // const bigNode = node1.l(node2) ? node2 : node1
    // console.log({smallNode, bigNode})
    // const left = bigNode.insertLeft()
    // console.log({left})
    // console.log('left.e(smallNode)', left.e(smallNode))
    // console.log('eq', left.e(smallNode) ? left.add(smallNode) : left)
    // return left.e(smallNode) ? smallNode.add(bigNode) : left
  }

  findLeftAndRight(rootNode) {
    let currNode = rootNode
    // console.log('currNode :', currNode);
    while (!this.e(currNode)) {
      if (this.l(currNode)) {
        const newNode = currNode.add(currNode.left)
        newNode.left = currNode.left
        newNode.right = currNode
        currNode = newNode
        // console.log('newNode :', newNode.value)
        // console.log('newNode.left :', newNode.left.value)
        // console.log('newNode.right :', newNode.right.value)
        // const temp = currNode
        // currNode = currNode.add(currNode.left)
        // currNode.right = temp
        // currNode.left = temp.left
      } else {
        const newNode = currNode.add(currNode.right)
        newNode.left = currNode
        newNode.right = currNode.right
        currNode = newNode
        // console.log('newNode :', newNode.value)
        // console.log('newNode.left :', newNode.left.value)
        // console.log('newNode.right :', newNode.right.value)
        // const temp = currNode
        // currNode = currNode.add(currNode.right)
        // currNode.left = temp
        // currNode.right = temp.right
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

// console.log('object', new Fraction('10/3').findLeftAndRight(new Fraction()))
