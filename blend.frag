precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D tex0;
uniform sampler2D tex1;

void main() {
  vec2 uv = vTexCoord;
  uv = 1.0 - uv;

  vec4 img = texture2D(tex0, uv);
  vec4 blur = texture2D(tex1, uv);
  vec4 mix = mix(img,blur,0.6);

  gl_FragColor = mix;

}
