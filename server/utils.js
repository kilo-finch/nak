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
    }
  }

  insertLeft() {
    let currNode = new Fraction()
    while (!currNode.l(this)) {
      const newNode = currNode.add(currNode.left)
      newNode.left = currNode.left
      newNode.right = currNode
      currNode = newNode
    }
    return currNode
  }

  insertRight() {
    let currNode = new Fraction()
    while (currNode.l(this)) {
      const newNode = currNode.add(currNode.right)
      newNode.left = currNode
      newNode.right = currNode.right
      currNode = newNode
    }
    return currNode
  }

  getLeftChild() {
    const node = this.createSternBrocotTreeNode()
    return node.add(node.left)
  }

  getRightChild() {
    const node = this.createSternBrocotTreeNode()
    return node.add(node.right)
  }

  static insertBetween(input1, input2) {
    const node1 = new Fraction(input1)
    const node2 = new Fraction(input2)
    const smallNode = node1.l(node2) ? node1 : node2
    const bigNode = node1.l(node2) ? node2 : node1
    const left = bigNode.getLeftChild()
    if (smallNode.l(left)) return left
    const right = smallNode.getRightChild()
    if (right.l(bigNode)) return right
    throw new Error('Its easier to commit suicide than make it work(((')
  }

  // static insertBetween(input1, input2) {
  //   const node1 = new Fraction(input1)
  //   const node2 = new Fraction(input2)

  //   let smallNode = node1.l(node2) ? node1 : node2
  //   const bigNode = node1.l(node2) ? node2 : node1
  //   //find left and right fathers of the smallnode
  //   smallNode = smallNode.createSternBrocotTreeNode()
  //   //check if right father of smallNode is less than bigNode,
  //   // if so return this node
  //   // Usually we go down in the tree, in this case we can go up in some cases
  //   if (smallNode.right.l(bigNode)) return smallNode.right
  //   // check if leftchild of the bigNode is more than small node and return it if it's true
  //   const left = bigNode.getLeftChild()
  //   if (smallNode.l(left)) return left
  //   //check if right child of the smallNode less than bigNode
  //   const right = smallNode.add(smallNode.right)
  //   if (right.l(bigNode)) return right
  //   // this case shouldn't ever happen, if it is.
  //   throw new Error('It\'s easier to commit suicide than make it work!')
  // }

  //find left and right fathers for each fraction number
  createSternBrocotTreeNode(rootNode) {
    let currNode
    if (!rootNode) currNode = new Fraction()
    while (!this.e(currNode)) {
      if (this.l(currNode)) {
        const newNode = currNode.add(currNode.left)
        newNode.left = currNode.left
        newNode.right = currNode
        currNode = newNode
      } else {
        const newNode = currNode.add(currNode.right)
        newNode.left = currNode
        newNode.right = currNode.right
        currNode = newNode
      }
    }
    return currNode
  }

  // sum two fractions to find node between them.
  // can be used only on child and parent nodes
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

  // checks if the node less than anotherNode/Fraction
  l(anotherNode) {
    return (
      this.value.numerator * anotherNode.value.denominator <
      anotherNode.value.numerator * this.value.denominator
    )
  }

  // checks if the node is equal than anotherNode/Fraction
  e(anotherNode) {
    return (
      this.value.numerator * anotherNode.value.denominator ===
      anotherNode.value.numerator * this.value.denominator
    )
  }
}

module.exports = {Fraction}
