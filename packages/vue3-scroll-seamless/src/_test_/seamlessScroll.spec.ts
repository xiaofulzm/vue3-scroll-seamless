import vue3ScrollSeamless from "../components/seamlessScroll.vue";

import { shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";

//测试分组
// 测试分组
describe("无缝滚动组件配置参数测试", () => {
  test("测试limitMoveNum(开启无缝滚动的数据量)配置是否生效!", async () => {
    const wrapper = shallowMount(vue3ScrollSeamless, {
      props: {
        dataList: [1, 2, 3, 4, 5],
        classOptions: {
          limitMoveNum: 6,
        },
      },
    });

    // 断言
    expect(wrapper.vm.scrollSwitch).toBe(false);
    await wrapper.setProps({ dataList: [1, 2, 3, 4, 5, 6, 7] });
    expect(wrapper.vm.scrollSwitch).toBe(true);
  });

  test("测试hoverStop(是否启用鼠标hover控制)配置是否生效!", () => {
    const wrapper = shallowMount(vue3ScrollSeamless, {
      props: {
        dataList: [1, 2, 3, 4, 5, 6, 7],
      },
    });
    expect(wrapper.vm.initData.isHover).toBe(false);
    const main = wrapper.find({ ref: "realBox" });
    main.trigger("mouseenter");
    expect(wrapper.vm.initData.isHover).toBe(true);
  });
});
