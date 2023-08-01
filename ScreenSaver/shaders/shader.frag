#version 450

const int res = 8;

struct FluidNoise {
    float noise;
};

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec3 fragPos;

layout(std140, binding = 2) buffer NoiseSSBOOut {
   FluidNoise noiseIn[ ];
};

layout(location = 0) out vec4 outColor;

void main() {
    int x = int(fragPos.x * res);
    int y = int(fragPos.y * res);

    int idx = (y * res + x);
    float n = noiseIn[idx].noise;

    outColor = vec4(n, n, n , 1.0);
}
