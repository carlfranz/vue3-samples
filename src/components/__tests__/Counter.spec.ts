/**
 * @vitest-environment jsdom
 */

import { shallowMount, VueWrapper } from "@vue/test-utils";
import { beforeEach, describe, expect, it } from "vitest";
import Counter from "../Counter.vue";

describe("Counter", () => {
    let wrapper: VueWrapper<InstanceType<typeof Counter>>;
    beforeEach(() => {
        wrapper = shallowMount(Counter);
    })

    it("increase the value", async () => {
        const btnIncrement = wrapper.get('#button-increment');
        await btnIncrement.trigger('click');

        expect(wrapper.emitted('increment')).length(1);
        expect(wrapper.emitted('increment')![0]).toEqual([
            {
                count: 1
            }
        ])
    })
});