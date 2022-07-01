/**
 * @vitest-environment jsdom
 */

import { shallowMount, VueWrapper } from "@vue/test-utils";
import { assert, beforeEach, describe, expect, it } from "vitest";
import { requireNotEmpty, requireNotNull } from "../../ValidatorUtils";
import TemperatureConverter from "../TemperatureConverter.vue";
import { TempConvState } from "../types";
import { nextTick } from 'vue'

describe("TemperatureConverter", () => {
    let wrapper: VueWrapper<InstanceType<typeof TemperatureConverter>>;
    beforeEach(() => {
        wrapper = shallowMount(TemperatureConverter);
    })

    // it("inserting a celsius temperature", async () => {
    //     const celsiusInput = wrapper.get('#celsius');
    //     await celsiusInput.setValue('123')

    //     const events = wrapper.emitted<TempConvState>('state_update')
    //     requireNotNull(events);
    //     requireNotEmpty(events);
    //     expect(events.length).toBe(2);

    //     const event = events[0];

    //     expect(event.celsius).toEqual(123)
    //     expect(event.fahrenheit).toEqual(321)
    //     expect(event.status).toEqual("UPDATE_C")
    // })

    it("inserting a celsius and then farhenheit temperature", async () => {
        const celsiusInput = wrapper.get<HTMLInputElement>('#celsius');
        const fahrenheitInput = wrapper.get<HTMLInputElement>('#fahrenheit');
        
        await celsiusInput.setValue('123')

        // checking computed value
        expect(fahrenheitInput.element.value).toEqual('253')

        // checking event
        let events = wrapper.emitted<TempConvState[]>('state_update')
        requireNotNull(events);
        requireNotEmpty(events);
        expect(events.length).toBe(1);

        const [event] = events[0];

        expect(event.celsius).toEqual(123)
        expect(event.fahrenheit).toEqual(12)
        expect(event.status).toEqual("UPDATE_C")

        await fahrenheitInput.setValue('321')

        expect(celsiusInput.element.value).toEqual('160')

        
        events = wrapper.emitted<TempConvState[]>('state_update');
        requireNotNull(events);
        requireNotEmpty(events);
        expect(events.length).toBe(2);
        const [event1] = events[1];

        expect(event1.celsius).toEqual(123)
        expect(event1.fahrenheit).toEqual(321)
        expect(event1.status).toEqual("UPDATE_F")
    })
});