set ProjectDir=%1

C:/VulkanSDK/1.3.243.0/Bin/glslc.exe %ProjectDir%/shaders/shader.vert -o %ProjectDir%/shaders/vert.spv
C:/VulkanSDK/1.3.243.0/Bin/glslc.exe %ProjectDir%/shaders/shader.frag -o %ProjectDir%/shaders/frag.spv
C:/VulkanSDK/1.3.243.0/Bin/glslc.exe %ProjectDir%/shaders/shader.comp -o %ProjectDir%/shaders/comp.spv
pause
