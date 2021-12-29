precision mediump float;

varying vec2 vTexCoord;

uniform sampler2D tex0;
uniform sampler2D tex1;

void main() {
  vec2 uv = vTexCoord;
  uv = 1.0 - uv;

  vec4 img = texture2D(tex0, uv);
  vec4 blur = texture2D(tex1, uv);

  float Y = 0.2126 * img.x + 0.7152 * img.y + 0.0722 * img.z;

  if (Y < 0.1) {
    gl_FragColor = blur;
  } else {
    gl_FragColor = img;
  }

}
