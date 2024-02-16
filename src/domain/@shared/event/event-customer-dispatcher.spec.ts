import EventDispatcher from "./event-dispatcher";

import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event";
import EnviaConsoleLog1Handler from "../../customer/event/handler/envia-console-log1-handler";
import EnviaConsoleLog2Handler from "../../customer/event/handler/envia-console-log2-handler";
import EnviaConsoleLogHandler from "../../customer/event/handler/envia-console-log-handler";

describe("Domain events tests", () => {
  enum eventName {
    CustomerCreatedEvent = "CustomerCreatedEvent",
    CustomerAddressChangedEvent = "CustomerAddressChangedEvent",
  }
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const EventHandlerCustomerCreated1 = new EnviaConsoleLog1Handler();
    const EventHandlerCustomerCreated2 = new EnviaConsoleLog2Handler();
    const EventHandlerCustomerAddressChanged2 = new EnviaConsoleLogHandler();

    eventDispatcher.register(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated1,
    );
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2,
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent],
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent].length,
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent][0],
    ).toMatchObject(EventHandlerCustomerCreated1);

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent],
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent].length,
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent][0],
    ).toMatchObject(EventHandlerCustomerCreated2);

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent],
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent]
        .length,
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers[
        eventName.CustomerAddressChangedEvent
      ][0],
    ).toMatchObject(EventHandlerCustomerAddressChanged2);
  });

  it("should unregister an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const EventHandlerCustomerCreated1 = new EnviaConsoleLog1Handler();
    const EventHandlerCustomerCreated2 = new EnviaConsoleLog2Handler();
    const EventHandlerCustomerAddressChanged2 = new EnviaConsoleLogHandler();

    eventDispatcher.register(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated1,
    );
    eventDispatcher.register(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated2,
    );
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2,
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent][0],
    ).toMatchObject(EventHandlerCustomerCreated1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent][0],
    ).toMatchObject(EventHandlerCustomerCreated2);
    expect(
      eventDispatcher.getEventHandlers[
        eventName.CustomerAddressChangedEvent
      ][0],
    ).toMatchObject(EventHandlerCustomerAddressChanged2);

    eventDispatcher.unregister(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated1,
    );
    eventDispatcher.unregister(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated2,
    );
    eventDispatcher.unregister(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2,
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent],
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent].length,
    ).toBe(0);

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent],
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent].length,
    ).toBe(0);

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent],
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent]
        .length,
    ).toBe(0);
  });

  it("should unregister all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const EventHandlerCustomerCreated1 = new EnviaConsoleLog1Handler();
    const EventHandlerCustomerCreated2 = new EnviaConsoleLog2Handler();
    const EventHandlerCustomerAddressChanged2 = new EnviaConsoleLogHandler();

    eventDispatcher.register(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated1,
    );
    eventDispatcher.register(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated2,
    );
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2,
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent],
    ).toMatchObject(EventHandlerCustomerCreated1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent],
    ).toMatchObject(EventHandlerCustomerCreated2);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent],
    ).toMatchObject(EventHandlerCustomerAddressChanged2);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent],
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent],
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent],
    ).toBeUndefined();
  });

  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();

    const EventHandlerCustomerCreated1 = new EnviaConsoleLog1Handler();
    const EventHandlerCustomerCreated2 = new EnviaConsoleLog2Handler();
    const EventHandlerCustomerAddressChanged2 = new EnviaConsoleLogHandler();

    const spyEventHandler1 = jest.spyOn(EventHandlerCustomerCreated1, "handle");
    const spyEventHandler2 = jest.spyOn(EventHandlerCustomerCreated2, "handle");
    const spyEventHandler3 = jest.spyOn(
      EventHandlerCustomerAddressChanged2,
      "handle",
    );

    eventDispatcher.register(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated1,
    );
    eventDispatcher.register(
      eventName.CustomerCreatedEvent,
      EventHandlerCustomerCreated2,
    );
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2,
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreatedEvent][0],
    ).toMatchObject(EventHandlerCustomerCreated1);
    expect(
      eventDispatcher.getEventHandlers[
        eventName.CustomerAddressChangedEvent
      ][0],
    ).toMatchObject(EventHandlerCustomerAddressChanged2);

    const customerCreated1Event = new CustomerCreatedEvent(null);
    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      name: "Mathheus Cabral",
      address: "Rua morom, 654",
      id: "123",
    });

    eventDispatcher.notify(customerCreated1Event);
    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
    expect(spyEventHandler3).toHaveBeenCalled();
  });
});
