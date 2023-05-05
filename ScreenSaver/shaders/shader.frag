#version 450

struct FluidNoise {
    float noise;
};

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec3 fragPos;

layout(std140, binding = 2) readonly buffer NoiseSSBOIn {
   FluidNoise noiseIn[ ];
};

layout(location = 0) out vec4 outColor;

void main() {
    vec2 st = fragPos.xy;
    float rnd = 0;

    float n = noiseIn[0].noise;
    outColor = vec4(n,n,n,1.0);
}
