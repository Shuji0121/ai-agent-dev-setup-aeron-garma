#!/usr/bin/env node

import * as readline from "readline";

class MCPServer {
    constructor() {
        this.id = 0;
    }

    send(message) {
        process.stdout.write(JSON.stringify(message) + "\n");
    }

    async handleInitialize(id) {
        this.send({
            jsonrpc: "2.0",
            id,
            result: {
                protocolVersion: "2024-11-05",
                capabilities: {
                    tools: {},
                },
                serverInfo: {
                    name: "rolldice-server",
                    version: "1.0.0",
                },
            },
        });
    }

    async handleListTools(id) {
        this.send({
            jsonrpc: "2.0",
            id,
            result: {
                tools: [{
                    name: "roll_dice",
                    description: "Roll a dice with a specified number of sides",
                    inputSchema: {
                        type: "object",
                        properties: {
                            sides: {
                                type: "integer",
                                description: "Number of sides (e.g., 6, 20)",
                                default: 6,
                            },
                        },
                    },
                }, ],
            },
        });
    }

    async handleCallTool(id, name, args) {
        if (name === "roll_dice") {
            const sides = args.sides || 6;
            const result = Math.floor(Math.random() * sides) + 1;

            this.send({
                jsonrpc: "2.0",
                id,
                result: {
                    content: [{
                        type: "text",
                        text: `🎲 Rolled a ${sides}-sided die: ${result}`,
                    }, ],
                },
            });
        } else {
            this.send({
                jsonrpc: "2.0",
                id,
                error: {
                    code: -32601,
                    message: "Tool not found",
                },
            });
        }
    }

    async start() {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false,
        });

        rl.on("line", (line) => {
            if (!line.trim()) return;

            try {
                const msg = JSON.parse(line);
                const { id, method, params } = msg;

                if (method === "initialize") {
                    this.handleInitialize(id);
                } else if (method === "tools/list") {
                    this.handleListTools(id);
                } else if (method === "tools/call") {
                    this.handleCallTool(id, params.name, params.arguments);
                } else {
                    this.send({
                        jsonrpc: "2.0",
                        id,
                        error: {
                            code: -32601,
                            message: "Method not found",
                        },
                    });
                }
            } catch (e) {
                console.error("Error:", e.message);
            }
        });

        rl.on("close", () => {
            process.exit(0);
        });
    }
}

const server = new MCPServer();
server.start();