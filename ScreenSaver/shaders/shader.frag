#version 450

const int res = 1024;

struct FluidNoise {
    float noise;
    vec2 gradient;
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

vec3 COLORS[7] = vec3[](
    vec3(0.996, 0.805, 0.281),
    vec3(0.941, 0.098, 0.73),
    vec3(0.52 , 0.   , 0.871),
    vec3(0.   , 0.816, 0.949),
    vec3(0.   , 0.559, 0.598),
    vec3(0.   , 0.195, 0.309),
    vec3(0.   , 0.043, 0.078));

float WEIGHTS[7] = float[](
    0.2,
    0.1,
    0.1,
    0.2,
    0.2,
    0.1,
    0.1);

vec3 interpolate(vec3 color2, vec3 color1, float fraction) {
    return (color2 - color1) * fraction + color1;
}

vec3 getColorFromHeight(float h) {
    float total = 0;
    for (int i = 0; i < 6; i++) {
       total += WEIGHTS[i];
       if(total >= h) {
            return interpolate(COLORS[i], COLORS[i+1], (total - h)/(total - WEIGHTS[i-1]));
        }
    }

    return COLORS[6];
}

void main() {
    float float_x = fragPos.x * (res-1);
    float float_y = fragPos.y * (res-1);

    int x = int(float_x);
    int y = int(float_y);

    float tl = getNoise(x,y), tr = getNoise(x+1,y), bl = getNoise(x, y+1), br = getNoise(x+1, y+1);

    float delta_x = float_x - x, delta_y = float_y - y;

    float n = tl * (1-delta_x) * (1-delta_y) + tr * delta_x * (1-delta_y) + bl * (1-delta_x) * delta_y + br * delta_x * delta_y;

    outColor = vec4(getColorFromHeight(n), 1.0);
}
