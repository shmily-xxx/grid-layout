<template>
  <div
    class="number-style"
    :style="{fontSize:fontSize+'px',justifyContent: justifyContent,alignItems:alignItems,backgroundColor:backgroundColor,color:color}"
  >{{numVal}}</div>
</template>
<script>
export default {
  name: 'Number',
  props: {
    numVal: {
      type: [Number, String],
      default: '',
    },
    fontSize: {
      type: Number,
      default: 20,
    },
    justifyContent: {
      type: String,
      default: 'center',
    },
    alignItems: {
      type: String,
      default: 'center',
    },
    backgroundColor: {
      type: String,
      default: '',
    },
    color: {
      type: String,
      default: '',
    },
  },
  data() {
    return {};
  },
};
</script>
<style>
.number-style {
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100% - 32px);
  width: 100%;
  font-size: 1rem;
}
</style>