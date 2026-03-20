#!/usr/bin/env node

import * as readline from "readline";

class GitHubServer {
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
                    name: "github-server",
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
                        name: "list_repos",
                        description: "List GitHub repositories",
                        inputSchema: {
                            type: "object",
                            properties: {
                                user: {
                                    type: "string",
                                    description: "GitHub username (default: current user)",
                                },
                            },
                        },
                    },
                    {
                        name: "get_repo_info",
                        description: "Get information about a specific repository",
                        inputSchema: {
                            type: "object",
                            properties: {
                                repo: {
                                    type: "string",
                                    description: "Repository name",
                                },
                            },
                        },
                    },
                    {
                        name: "create_issue",
                        description: "Create a GitHub issue",
                        inputSchema: {
                            type: "object",
                            properties: {
                                repo: {
                                    type: "string",
                                    description: "Repository name",
                                },
                                title: {
                                    type: "string",
                                    description: "Issue title",
                                },
                                body: {
                                    type: "string",
                                    description: "Issue description",
                                },
                            },
                        },
                    },
                ],
            },
        });
    }

    async handleCallTool(id, name, args) {
        if (name === "list_repos") {
            const user = args.user || "Shuji0121";

            this.send({
                jsonrpc: "2.0",
                id,
                result: {
                    content: [{
                        type: "text",
                        text: `🔗 GitHub Repositories for ${user}:\n1. Aeron_exam\n2. git-activity-1\n3. Shuji0121`,
                    }, ],
                },
            });
        } else if (name === "get_repo_info") {
            const repo = args.repo || "Aeron_exam";

            this.send({
                jsonrpc: "2.0",
                id,
                result: {
                    content: [{
                        type: "text",
                        text: `📦 Repository: ${repo}\nDescription: AI Agent Developer Environment Setup\nStars: 5\nLanguage: JavaScript\nLicense: MIT`,
                    }, ],
                },
            });
        } else if (name === "create_issue") {
            const repo = args.repo || "Aeron_exam";
            const title = args.title || "New Issue";
            const body = args.body || "Issue description";

            this.send({
                jsonrpc: "2.0",
                id,
                result: {
                    content: [{
                        type: "text",
                        text: `✅ Issue Created!\nRepository: ${repo}\nTitle: ${title}\nStatus: Open`,
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

const server = new GitHubServer();
server.start();