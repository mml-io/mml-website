import { Example } from "@/types/example";

export const clockExample: Example = {
  name: "clock",
  description: "A simple clock",
  code: `
<m-group y="4">
  <m-cylinder color="lightgrey" radius="4" height="0.1" rx="90"></m-cylinder>
  <m-group id="hour" rz="0" z="0.1">
    <m-cube sx="0.14" sy="1.2" sz="0.08" z="0.04" color="#000000" y="0.2"></m-cube>
  </m-group>
  <m-group id="minute" rz="0" z="0.11">
    <m-cube sx="0.1" sy="2.4" sz="0.08" z="0.04" color="#000000" y="0.3"></m-cube>
  </m-group>
  <m-group id="second" rz="0" z="0.12">
    <m-cube sx="0.08" sy="3.2" sz="0.08" z="0.04" color="#ff0000" y="0.8"></m-cube>
  </m-group>
</m-group>

<script>
  function setTime() {
    const d = new Date();
    document.getElementById("hour").setAttribute("rz", (d.getHours() / 12) * -360);
    document.getElementById("minute").setAttribute("rz", (d.getMinutes() / 60) * -360);
    document.getElementById("second").setAttribute("rz", (d.getSeconds() / 60) * -360);
  }

  setTime();

  setInterval(setTime, 1000); // update every second
</script>
`,
  image: "/images/examples/clock.png",
};
