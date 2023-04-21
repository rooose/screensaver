#version 450

layout(binding = 0) uniform UniformBufferObject {
    float time;
} ubo;

layout(location = 0) in vec3 fragColor;
layout(location = 0) out vec4 outColor;

layout(location = 1) in vec3 fragPos;

float random (vec2 st) {
    return fract(sin(ubo.time * dot(st.xy,
                         vec2(12.9898,78.233)))*43758.5453123);
}

void main() {
    vec2 st = fragPos.xy;
    float rnd = random(st);
    outColor = vec4(0., 1., 1., 1.0);
}
