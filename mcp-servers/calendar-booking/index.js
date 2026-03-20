#!/usr/bin/env node

import * as readline from "readline";

class CalendarBookingServer {
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
                    name: "calendar-booking-server",
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
                        name: "check_availability",
                        description: "Check calendar availability for scheduling",
                        inputSchema: {
                            type: "object",
                            properties: {
                                date: {
                                    type: "string",
                                    description: "Date to check (e.g., 'tomorrow', '2026-03-21')",
                                },
                            },
                        },
                    },
                    {
                        name: "book_meeting",
                        description: "Book a meeting or event",
                        inputSchema: {
                            type: "object",
                            properties: {
                                title: {
                                    type: "string",
                                    description: "Meeting title",
                                },
                                date: {
                                    type: "string",
                                    description: "Meeting date",
                                },
                                time: {
                                    type: "string",
                                    description: "Meeting time (e.g., '2:00 PM')",
                                },
                            },
                        },
                    },
                ],
            },
        });
    }

    async handleCallTool(id, name, args) {
        if (name === "check_availability") {
            const date = args.date || "tomorrow";
            const availability = "10:00 AM - 11:00 AM (Free)\n2:00 PM - 3:00 PM (Free)\n4:00 PM - 5:00 PM (Busy)";

            this.send({
                jsonrpc: "2.0",
                id,
                result: {
                    content: [{
                        type: "text",
                        text: `📅 Availability for ${date}:\n${availability}`,
                    }, ],
                },
            });
        } else if (name === "book_meeting") {
            const title = args.title || "Meeting";
            const date = args.date || "TBD";
            const time = args.time || "TBD";

            this.send({
                jsonrpc: "2.0",
                id,
                result: {
                    content: [{
                        type: "text",
                        text: `✅ Meeting booked: ${title}\n📅 Date: ${date}\n⏰ Time: ${time}`,
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

const server = new CalendarBookingServer();
server.start();