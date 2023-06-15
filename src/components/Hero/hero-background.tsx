/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { useEffect, useRef } from "react";

function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<number>();
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas?.getContext("webgl2");
    const randomPattern = Math.random() * (0.15 - 0.035) + 0.035;

    if (!gl) return;

    const vertexShaderSrc = /* glsl */ `#version 300 es
      in vec2 position;
      void main(void) {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSrc = /* glsl */ `#version 300 es
    precision highp float;
    
    uniform vec2 resolution;
    uniform float time;
    out vec4 fragColor;
    
    float osc(float s, float e, float ts) {
      return (e - s) / 2.0 + s + sin(time * ts) * (e - s) / 2.0;
    }

    vec2 rand2(vec2 p) {
      return fract(vec2(sin(p.x * 591.32 + p.y * 154.077), cos(p.x * 391.32 + p.y * 49.077)));
    }
    
    float voronoi(in vec2 x) {
      vec2 p = floor(x);
      vec2 f = fract(x);
      float minDistance = 1.0;
      for(int j = -1; j <= 1; j ++)
      for(int i = -1; i <= 1; i ++) {
        vec2 b = vec2(i, j);
        vec2 rand = 0.5 + 0.5 * sin(time * 3.0 + 12.0 * rand2(p + b));
        vec2 r = vec2(b) - f + rand;
        minDistance = min(minDistance, length(r));
      }
      return minDistance;
    }
    
    void main(void) {
      vec2 uv = gl_FragCoord.xy / resolution.xy;
      vec2 suv = (uv - 0.5) * 2.0;
      uv.x *= resolution.x / resolution.y;
      uv.y += time * 0.03;
      float val = pow(voronoi(uv * 8.0) * 1.1, 7.0);
      float thickness = 1.0 / min(resolution.x, resolution.y);
      vec2 grid = step(mod(uv, ${randomPattern}), vec2(thickness));
      float a = clamp(val * (grid.x + grid.y) * (1.0 - abs(suv.y)), 0.0, 2.0);
      fragColor = clamp(vec4(0.0, a * 0.4, a * 0.9, a), 0.0, 1.0);
    }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, vertexShaderSrc);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, fragmentShaderSrc);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resolutionUniformLocation = gl.getUniformLocation(program, "resolution");
    const timeUniformLocation = gl.getUniformLocation(program, "time");

    const resize = () => {
      if (!canvas) return;
      canvas.width = canvas.clientWidth;
      canvas.height = canvas.clientHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
    };
    window.addEventListener("resize", resize);
    resize();

    const render = () => {
      gl.uniform1f(timeUniformLocation, (Date.now() - startTime.current) / 1000.0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      requestRef.current = requestAnimationFrame(render);
    };
    render();

    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        left: "0px",
        top: "0px",
        width: "100%",
        height: "50%",
        zIndex: "-1",
      }}
    />
  );
}

export default HeroBackground;
