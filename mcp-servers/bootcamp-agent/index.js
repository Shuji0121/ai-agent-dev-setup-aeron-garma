#!/usr/bin/env node

import * as readline from "readline";

class BootcampAgentServer {
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
                    name: "bootcamp-agent-server",
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
                    name: "get_bootcamp_info",
                    description: "Get information about the GARMA bootcamp and current week",
                    inputSchema: {
                        type: "object",
                        properties: {
                            topic: {
                                type: "string",
                                description: "Topic to get info about (e.g., 'week1', 'mcp-servers', 'ai-agent')",
                            },
                        },
                    },
                }, ],
            },
        });
    }

    async handleCallTool(id, name, args) {
        if (name === "get_bootcamp_info") {
            const topic = args.topic || "general";
            let response = "";

            if (topic === "week1") {
                response = "Week 1: AI Agent Developer Environment Setup\n- MCP Servers Configuration\n- Claude Desktop Integration\n- GitHub Repository Setup";
            } else if (topic === "mcp-servers") {
                response = "MCP Servers: Rolldice, Bootcamp AI Agent, Calendar Booking, GitHub";
            } else if (topic === "ai-agent") {
                response = "AI Agent Developer: Building systems where AI is a collaborative partner in development";
            } else {
                response = `Bootcamp Info: GARMA Week 1 - AI Agent Developer Setup`;
            }

            this.send({
                jsonrpc: "2.0",
                id,
                result: {
                    content: [{
                        type: "text",
                        text: `📚 ${response}`,
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

const server = new BootcampAgentServer();
server.start();