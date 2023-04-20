cmake_minimum_required(VERSION 3.15)

project(Screensaver)

set(CMAKE_CXX_STANDARD 17)
set(TARGET_DIRECTORY "C:/Windows/System32")

file (GLOB_RECURSE SHADERS
    "${PROJECT_SOURCE_DIR}/shaders/*.vert"
    "${PROJECT_SOURCE_DIR}/shaders/*.frag"
    "${PROJECT_SOURCE_DIR}/shaders/*.spv")
file(GLOB SOURCES
    "${PROJECT_SOURCE_DIR}/*.cpp")
file(GLOB HEADERS
    "${PROJECT_SOURCE_DIR}/*.hpp"
    "${PROJECT_SOURCE_DIR}/*.h")
source_group(shaders FILES ${SHADERS})
find_package(Vulkan REQUIRED)

set(glm_DIR "C:/Libraries/glm/cmake/glm")
find_package(glm REQUIRED)

message(INFO ${PROJECT_SOURCE_DIR})

add_executable(${PROJECT_NAME} ${SOURCES} ${HEADERS})
target_include_directories(${PROJECT_NAME} PUBLIC ${Vulkan_INCLUDE_DIRS})
target_link_libraries(${PROJECT_NAME} glm::glm glfw Vulkan::Vulkan)

install(TARGETS ${PROJECT_NAME} CONFIGURATIONS Release RUNTIME DESTINATION ${TARGET_DIRECTORY})

add_custom_command(TARGET ${PROJECT_NAME} POST_BUILD
    COMMAND ${CMAKE_COMMAND} -E make_directory "${TARGET_DIRECTORY}/shaders/"
    COMMAND ${CMAKE_COMMAND} -E copy_directory
        "${PROJECT_SOURCE_DIR}/shaders"
        "${TARGET_DIRECTORY}/shaders"
        )