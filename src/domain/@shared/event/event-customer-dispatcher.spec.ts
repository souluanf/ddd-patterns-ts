import EventDispatcher from "./event-dispatcher";

import CustomerCreated1Event from "../../customer/event/customer-created-1.event";
import CustomerCreated2Event from "../../customer/event/customer-created-2.event";
import CustomerAddressChangedEvent from "../../customer/event/customer-address-changed.event";
import EnviaConsoleLog1Handler from "../../customer/event/handler/envia-console-log1-handler";
import EnviaConsoleLog2Handler from "../../customer/event/handler/envia-console-log2-handler";
import EnviaConsoleLogHandler from "../../customer/event/handler/envia-console-log-handler";

describe("Domain events tests", () => {
  enum eventName {
    CustomerCreated1Event = "CustomerCreated1Event",
    CustomerCreated2Event = "CustomerCreated2Event",
    CustomerAddressChangedEvent = "CustomerAddressChangedEvent",
  }
  it("should register an event handler", () => {
    const eventDispatcher = new EventDispatcher();
    const EventHandlerCustomerCreated1 = new EnviaConsoleLog1Handler();
    const EventHandlerCustomerCreated2 = new EnviaConsoleLog2Handler();
    const EventHandlerCustomerAddressChanged2 = new EnviaConsoleLogHandler();

    eventDispatcher.register(
      eventName.CustomerCreated1Event,
      EventHandlerCustomerCreated1,
    );
    eventDispatcher.register(
      eventName.CustomerCreated2Event,
      EventHandlerCustomerCreated2,
    );
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2,
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event],
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event].length,
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event][0],
    ).toMatchObject(EventHandlerCustomerCreated1);

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event],
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event].length,
    ).toBe(1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event][0],
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
      eventName.CustomerCreated1Event,
      EventHandlerCustomerCreated1,
    );
    eventDispatcher.register(
      eventName.CustomerCreated2Event,
      EventHandlerCustomerCreated2,
    );
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2,
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event][0],
    ).toMatchObject(EventHandlerCustomerCreated1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event][0],
    ).toMatchObject(EventHandlerCustomerCreated2);
    expect(
      eventDispatcher.getEventHandlers[
        eventName.CustomerAddressChangedEvent
      ][0],
    ).toMatchObject(EventHandlerCustomerAddressChanged2);

    eventDispatcher.unregister(
      eventName.CustomerCreated1Event,
      EventHandlerCustomerCreated1,
    );
    eventDispatcher.unregister(
      eventName.CustomerCreated2Event,
      EventHandlerCustomerCreated2,
    );
    eventDispatcher.unregister(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2,
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event],
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event].length,
    ).toBe(0);

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event],
    ).toBeDefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event].length,
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
      eventName.CustomerCreated1Event,
      EventHandlerCustomerCreated1,
    );
    eventDispatcher.register(
      eventName.CustomerCreated2Event,
      EventHandlerCustomerCreated2,
    );
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2,
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event],
    ).toMatchObject(EventHandlerCustomerCreated1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event],
    ).toMatchObject(EventHandlerCustomerCreated2);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerAddressChangedEvent],
    ).toMatchObject(EventHandlerCustomerAddressChanged2);

    eventDispatcher.unregisterAll();

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event],
    ).toBeUndefined();
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event],
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
      eventName.CustomerCreated1Event,
      EventHandlerCustomerCreated1,
    );
    eventDispatcher.register(
      eventName.CustomerCreated2Event,
      EventHandlerCustomerCreated2,
    );
    eventDispatcher.register(
      eventName.CustomerAddressChangedEvent,
      EventHandlerCustomerAddressChanged2,
    );

    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated1Event][0],
    ).toMatchObject(EventHandlerCustomerCreated1);
    expect(
      eventDispatcher.getEventHandlers[eventName.CustomerCreated2Event][0],
    ).toMatchObject(EventHandlerCustomerCreated2);
    expect(
      eventDispatcher.getEventHandlers[
        eventName.CustomerAddressChangedEvent
      ][0],
    ).toMatchObject(EventHandlerCustomerAddressChanged2);

    const customerCreated1Event = new CustomerCreated1Event(null);
    const customerCreated2Event = new CustomerCreated2Event(null);
    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      name: "Mathheus Cabral",
      address: "Rua morom, 654",
      id: "123",
    });

    eventDispatcher.notify(customerCreated1Event);
    eventDispatcher.notify(customerCreated2Event);
    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
    expect(spyEventHandler3).toHaveBeenCalled();
  });
});
