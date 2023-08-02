#version 450

const int res = 256;

struct FluidNoise {
    float noise;
};

layout(location = 0) in vec3 fragColor;
layout(location = 1) in vec3 fragPos;

layout(std140, binding = 2) buffer NoiseSSBOOut {
   FluidNoise noiseIn[];
};

layout(location = 0) out vec4 outColor;

int getIdx(int x, int y) {
    return x + y * res;
}

float getNoise(int x, int y) {
     return noiseIn[getIdx(x,y)].noise;
}


void main() {
    float float_x = fragPos.x * (res-1);
    float float_y = fragPos.y * (res-1);

    int x = int(float_x);
    int y = int(float_y);

    float tl = getNoise(x,y), tr = getNoise(x+1,y), bl = getNoise(x, y+1), br = getNoise(x+1, y+1);

    float delta_x = float_x - x, delta_y = float_y - y;

    float n = tl * (1-delta_x) * (1-delta_y) + tr * delta_x * (1-delta_y) + bl * (1-delta_x) * delta_y + br * delta_x * delta_y;

    //float n = getNoise(x,y);
    outColor = vec4(n, n, n, 1.0);
}
