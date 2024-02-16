import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Order("", "123", [])).toThrow("Id is required");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => new Order("123", "", [])).toThrow("CustomerId is required");
  });

  it("should add items to the order", () => {
    const initialItem = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const order = new Order("o1", "c1", [initialItem]);

    const newItem = new OrderItem("i2", "Item 2", 200, "p2", 1);
    order.addItem([newItem]);

    expect(order.items.length).toBe(2); // Verifica se o número de itens no pedido é 2
    expect(order.total()).toBe(400); // Verifica se o total do pedido é 400 (100*2 + 200*1)
  });

  it("should not throw error when all validations pass", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 1);
    expect(() => new Order("o1", "c1", [item])).not.toThrow();
  });

  it("should throw error when items is empty", () => {
    expect(() => new Order("123", "123", [])).toThrow("Items are required");
  });

  it("should throw error when id is empty", () => {
    expect(() => new Order("", "123", [])).toThrow("Id is required");
  });

  it("should throw an error if the order ID is empty", () => {
    expect(
      () =>
        new Order("", "customerId", [
          new OrderItem("1", "Item 1", 100, "p1", 2),
        ]),
    ).toThrow("Id is required");
  });

  it("should throw an error if the customer ID is empty", () => {
    expect(
      () => new Order("1", "", [new OrderItem("1", "Item 1", 100, "p1", 2)]),
    ).toThrow("CustomerId is required");
  });

  it("should throw an error if no items are provided", () => {
    expect(() => new Order("1", "customerId", [])).toThrow(
      "Items are required",
    );
  });

  it("should return the correct order ID", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const order = new Order("o1", "c1", [item]);
    expect(order.id).toBe("o1");
  });

  it("should return the correct customer ID", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);

    const order = new Order("o1", "c1", [item]);
    expect(order.customerId).toBe("c1");
  });

  describe("OrderItem unit tests", () => {
    const orderItem = new OrderItem("1", "Item 1", 100, "p1", 2);

    it("should return the correct id", () => {
      expect(orderItem.id).toBe("1");
    });

    it("should return the correct productId", () => {
      expect(orderItem.productId).toBe("p1");
    });

    it("should return the correct name", () => {
      expect(orderItem.name).toBe("Item 1");
    });

    it("should return the correct price", () => {
      expect(orderItem.price).toBe(100);
    });

    it("should return the correct quantity", () => {
      expect(orderItem.quantity).toBe(2);
    });

    it("should calculate total correctly", () => {
      expect(orderItem.total()).toBe(200); // preço (100) * quantidade (2) = 200
    });
  });

  it("should return the correct items", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const order = new Order("o1", "c1", [item]);

    expect(order.items.length).toBe(1);
    expect(order.items[0]).toBe(item);
  });

  it("should calculate total", () => {
    const item = new OrderItem("i1", "Item 1", 100, "p1", 2);
    const item2 = new OrderItem("i2", "Item 2", 200, "p2", 2);
    const order = new Order("o1", "c1", [item]);

    let total = order.total();

    expect(order.total()).toBe(200);

    const order2 = new Order("o1", "c1", [item, item2]);
    total = order2.total();
    expect(total).toBe(600);
  });

  it("should throw error if the item qte is less or equal zero 0", () => {
    expect(() => {
      const item = new OrderItem("i1", "Item 1", 100, "p1", 0);
      new Order("o1", "c1", [item]);
    }).toThrow("Quantity must be greater than 0");
  });
});
