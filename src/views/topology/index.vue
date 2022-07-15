<template>
  <div class="topology" ref="topology"></div>
</template>
<script>
import * as d3 from 'd3';
export default {
  data() {
    return {
      num: 0,
      svg: null,
      topology: {
        nodes: [
          {
            id: 'VXNlcg==.0',
            name: 'User',
            type: 'USER',
            isReal: false,
          },
          {
            id: 'YWdlbnQ6OnJlY29tbWVuZGF0aW9u.1',
            name: 'agent::recommendation',
            type: 'Flask',
            isReal: true,
          },
          {
            id: 'YWdlbnQ6OnNvbmdz.1',
            name: 'agent::songs',
            type: 'Tomcat',
            isReal: true,
          },
          {
            id: 'YWdlbnQ6OmdhdGV3YXk=.1',
            name: 'agent::gateway',
            type: 'spring-webflux',
            isReal: true,
          },
          {
            id: 'bG9jYWxob3N0Oi0x.0',
            name: 'localhost:-1',
            type: 'H2',
            isReal: false,
          },
          {
            id: 'YWdlbnQ6OmFwcA==.1',
            name: 'agent::app',
            type: 'Express',
            isReal: true,
          },
          {
            id: 'YWdlbnQ6OnVp.1',
            name: 'agent::ui',
            type: null,
            isReal: true,
          },
        ],
        calls: [
          {
            id: 'YWdlbnQ6OnJlY29tbWVuZGF0aW9u.1-YWdlbnQ6OnNvbmdz.1',
            source: 'YWdlbnQ6OnJlY29tbWVuZGF0aW9u.1',
            detectPoints: ['CLIENT', 'SERVER'],
            target: 'YWdlbnQ6OnNvbmdz.1',
          },
          {
            id: 'YWdlbnQ6OnNvbmdz.1-bG9jYWxob3N0Oi0x.0',
            source: 'YWdlbnQ6OnNvbmdz.1',
            detectPoints: ['CLIENT'],
            target: 'bG9jYWxob3N0Oi0x.0',
          },
          {
            id: 'YWdlbnQ6OnVp.1-YWdlbnQ6OmFwcA==.1',
            source: 'YWdlbnQ6OnVp.1',
            detectPoints: ['CLIENT', 'SERVER'],
            target: 'YWdlbnQ6OmFwcA==.1',
          },
          {
            id: 'YWdlbnQ6OmFwcA==.1-YWdlbnQ6OnNvbmdz.1',
            source: 'YWdlbnQ6OmFwcA==.1',
            detectPoints: ['CLIENT', 'SERVER'],
            target: 'YWdlbnQ6OnNvbmdz.1',
          },
          {
            id: 'YWdlbnQ6OmFwcA==.1-YWdlbnQ6OnJlY29tbWVuZGF0aW9u.1',
            source: 'YWdlbnQ6OmFwcA==.1',
            detectPoints: ['CLIENT', 'SERVER'],
            target: 'YWdlbnQ6OnJlY29tbWVuZGF0aW9u.1',
          },
          {
            id: 'YWdlbnQ6OmFwcA==.1-YWdlbnQ6OmdhdGV3YXk=.1',
            source: 'YWdlbnQ6OmFwcA==.1',
            detectPoints: ['CLIENT', 'SERVER'],
            target: 'YWdlbnQ6OmdhdGV3YXk=.1',
          },
          {
            id: 'VXNlcg==.0-YWdlbnQ6OmFwcA==.1',
            source: 'VXNlcg==.0',
            detectPoints: ['SERVER'],
            target: 'YWdlbnQ6OmFwcA==.1',
          },
        ],
      },
    };
  },
  mounted() {
    const reg=/^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领][A-HJ-NP-Z][A-HJ-NP-Z0-9]{4,5}[A-HJ-NP-Z0-9挂学警港澳]$/
    console.log(reg.test('京A1234522122'))
    this.svg = d3
      .select(this.$refs.topology)
      .append('svg')
      .attr('class', 'topo-svg');
    let graph = this.svg
      .append('g')
      .attr('class', 'topo-svg-graph')
      .attr('transform', `translate(0, 0)`);
    // graph.append('rect')
    // .attr('width', 50)
    // .attr('height', 50)
    // .attr('fill', 'red');

    this.svg.call(
      d3.zoom().on('zoom', function () {
        graph.attr('transform', d3.zoomTransform(this));
      })
    );
    let node = graph
      .append('g')
      // .attr('transform', () => `translate(70,30)`)
      .selectAll('.topo-node')
      .data(this.topology.nodes);
    // node.exit().remove();
    // node.enter().attr(
    //   'transform',
    //   () => `translate(70,30)`
    //   // `translate(${d.x - 22},${d.y - 22})`;
    // );
    function started(d) {
      // if (!d3.event.active) {
      //     simulation.alphaTarget(.2).restart()
      // }
      d.fx = d.x;
      // fx fy 表示下次节点被固定的位置
      // 每次tick结束node.x都会被设置为node.fx，node.vx设置为0
      d.fy = d.y;
    }

    function dragged(d) {
      d.fx = d3.event.x;
      d.fy = d3.event.y;
    }

    function ended(d) {
      // if (!d3.event.active) {
      //     // 设置为0直接停止，如果大于alphaMin则会逐渐停止
      //     simulation.alphaTarget(0)
      // }
      d.fx = null;
      d.fy = null;
    }
    const nodeEnter = node
      .enter()
      .append('g')
      .attr('transform', () => {
        this.num += 100;
        return `translate(${this.num},${this.num + 100})`;
      })
      .call(
        d3.drag().on('start', started).on('drag', dragged).on('end', ended)
      );
    nodeEnter
      .append('image')
      .attr('width', 49)
      .attr('height', 49)
      .attr('x', 2)
      .attr('y', 10)
      .attr('style', 'cursor: move;');
    nodeEnter
      .append('text')
      .attr('class', 'topo-text')
      .attr('text-anchor', 'middle')
      .attr('x', 22)
      .attr('y', 70)
      .text((d) => {
        return d.name;
      });
  },
};
</script>
<style lang="scss">
.topology {
  height: 600px;
  width: 100%;
  .topo-svg {
    width: 100%;
    height: calc(100% - 5px);
    cursor: move;
  }
}
</style>