import Product from "./product";
import ProductB from "./product-b";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => new Product("", "Product 1", 100)).toThrow("Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => new Product("123", "", 100)).toThrow("Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => new Product("123", "Name", -1)).toThrowError(
      "Price must be greater than zero",
    );
  });

  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });

  it("should throw error when trying to change name to empty", () => {
    const product = new ProductB("123", "Product 1", 100);
    expect(() => {
      product.changeName("");
    }).toThrow("Name is required");
  });

  it("should throw error when id is empty", () => {
    expect(() => {
      new ProductB("", "Product 1", 100);
    }).toThrow("Id is required");
  });

  it("should throw error when trying to change price to a negative value", () => {
    const product = new ProductB("123", "Product 1", 100);
    expect(() => {
      product.changePrice(-100);
    }).toThrow("Price must be greater than zero");
  });

  it("should change price", () => {
    const product = new ProductB("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(300);
  });

  it("should throw error when trying to change name to empty", () => {
    const product = new Product("123", "Product 1", 100);
    expect(() => {
      product.changeName("");
    }).toThrow("Name is required");
  });

  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product 1", 100);
    }).toThrow("Id is required");
  });

  it("should throw error when trying to change price to a negative value", () => {
    const product = new Product("123", "Product 1", 100);
    expect(() => {
      product.changePrice(-100);
    }).toThrow("Price must be greater than zero");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
