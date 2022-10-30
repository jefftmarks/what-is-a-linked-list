class LinkedList {
  constructor(head = null) {
		this.head = head;
  }

  iterate(callback) {
		let curr = this.head;
		while (curr) {
			callback(curr);
			curr = curr.next;
		}
		return this.head;
  }

  // print each node's value on its own line
  // use your iterate method to be DRY! Don't get caught in the code rain, brrr.
  print() {
		this.iterate((node) => console.log(node.value));
  }

  // find the node with the target value and return it
  // if not found return null, use your iterate method to be DRY!
  find(target) {
		let target_node = null;

		this.iterate((node) => {
			if (node.value === target) {
				target_node = node;
			}
		});

		return target_node;
  }

  // add the node to the start of the list, no nodes should be removed
  addFirst(node) {
		node.next = this.head;
		this.head = node;
  }

  // add node to end of list, no nodes should be removed
  // you may wish to use the iterate method
  addLast(node) {
		if (!this.head) {
			this.head = node;
		} else {
			let last = null;
			this.iterate((el) => {
				if (!el.next) {
					last = el;
				}
			});
			last.next = node;
		}
  }

  // remove the first Node in the list and update head
  // and return the removed node
  removeFirst() {
		const removed = this.head;
		if (this.head) {
			this.head = removed.next;
		}
		return removed;
  }

  // remove the tail node, iterate may be helpful
  // return the node you just removed
  removeLast() {
		let removed = null;

		this.iterate((node) => {
			if (!node.next.next) {
				removed = node.next;
				node.next = null;
			}
		});

		return removed;
  }

  // replace the node at the given index with the given node
  replace(idx, node) {
		if (idx === 0) {
			node.next = this.head.next;
			this.head = node;
		} else {

			let count = 0;

			this.iterate((el) => {
				if (count + 1 === idx) {
					node.next = el.next.next;
					el.next = node;
				}
				count++;
			});
		}
		return node;
  }

  // insert the node at the given index
  // no existing nodes should be removed or replaced
  insert(idx, node) {
		if (idx === 0) {
			this.addFirst(node);
		} else {
			let count = 0;
			this.iterate((el) => {
				if (count + 1 === idx) {
					node.next = el.next;
					el.next = node;
				}
				count++;
			})
		}
  }

  // remove the node at the given index, and return it
  remove(idx) {
		let removed = null;

		if (idx === 0) {
			removed = this.removeFirst();
		} else {
			let count = 0;
			this.iterate((el) => {
				if (count + 1 === idx) {
					removed = el.next;
					el.next = el.next.next;
				}
				count++;
			})
		}
		return removed;
  }

	clear() {
		this.head = null;
	}
}

class Node {
  constructor(value = null, next = null) {
    this.value = value;
		this.next = next;
  }
}

if (require.main === module) {
  const head = new Node('one', new Node('two', new Node('three')))
	list = new LinkedList(head);
	list.clear();
	list.print();
}

module.exports = {
  Node, LinkedList
};
