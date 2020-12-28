# CindyJS Import / Export Generator

CindyJS does currently rely on implicit imports and exports and a custom build system to include those in a specific order.

This is a program that created standard ES6 imports and exports to build CindyJS with a standard build system like webpack.

Current status: imports and exports are generated, but due to cyclic dependencies we cannot build CindyJS with it yet.
