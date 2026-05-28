/* eslint-disable */

export const getN8nNodeConfig = (step, index) => {
    const tool = String(step.tool || '').toLowerCase();
    const action = String(step.action || '').toLowerCase();

    // Default configuration (HTTP Request)
    let type = "n8n-nodes-base.httpRequest";
    let typeVersion = 4.1;
    let parameters: any = {
      url: "https://api.example.com/v1/action",
      method: "POST",
      sendBody: true,
      specifyBody: "json",
      jsonParameters: false,
      jsonBody: JSON.stringify({ 
        action: step.action,
        input_data: "={{ $json.output || $json.text || $json.message }}"
      })
    };

    // --- SPECIALIZED HTTP API ENDPOINTS FOR AURA TOOLS ---
    
    // Bland.ai (AI Calls)
    if (tool.includes("bland")) {
      type = "n8n-nodes-base.httpRequest";
      typeVersion = 4.1;
      parameters = {
        url: "https://api.bland.ai/v1/calls",
        method: "POST",
        sendHeaders: true,
        headerParameters: {
          parameters: [
            { name: "authorization", value: "YOUR_BLAND_API_KEY" }
          ]
        },
        sendBody: true,
        specifyBody: "json",
        jsonParameters: false,
        jsonBody: JSON.stringify({
          phone_number: "+1234567890",
          task: `Tâche AURA : ${step.action}`,
          voice: "rachel",
          input_data: {
            previous_context: "={{ $json.output || $json.text || $json.message }}"
          }
        })
      };
    }
    // ElevenLabs (AI Text to Speech)
    else if (tool.includes("elevenlabs")) {
      type = "n8n-nodes-base.httpRequest";
      typeVersion = 4.1;
      parameters = {
        url: "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
        method: "POST",
        sendHeaders: true,
        headerParameters: {
          parameters: [
            { name: "xi-api-key", value: "YOUR_ELEVENLABS_API_KEY" }
          ]
        },
        sendBody: true,
        specifyBody: "json",
        jsonParameters: false,
        jsonBody: JSON.stringify({
          text: "={{ $json.output || $json.text || $json.message || 'Bonjour' }}",
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      };
    }
    // Attio CRM
    else if (tool.includes("attio")) {
      type = "n8n-nodes-base.httpRequest";
      typeVersion = 4.1;
      parameters = {
        url: "https://api.attio.com/v2/records",
        method: "POST",
        sendHeaders: true,
        headerParameters: {
          parameters: [
            { name: "Authorization", value: "Bearer YOUR_ATTIO_TOKEN" }
          ]
        },
        sendBody: true,
        specifyBody: "json",
        jsonParameters: false,
        jsonBody: JSON.stringify({
          data: {
            values: {
              notes: "={{ $json.output || $json.text || $json.message }}",
              action_desc: step.action
            }
          }
        })
      };
    }
    // Invoice Ninja
    else if (tool.includes("ninja") || tool.includes("invoice")) {
      type = "n8n-nodes-base.httpRequest";
      typeVersion = 4.1;
      parameters = {
        url: "https://demo.invoiceninja.com/api/v1/invoices",
        method: "POST",
        sendHeaders: true,
        headerParameters: {
          parameters: [
            { name: "X-API-TOKEN", value: "YOUR_INVOICE_NINJA_TOKEN" }
          ]
        },
        sendBody: true,
        specifyBody: "json",
        jsonParameters: false,
        jsonBody: JSON.stringify({
          client_id: "CLIENT_ID",
          amount: 100,
          notes: "={{ $json.output || $json.text || $json.message }}",
          description: step.action
        })
      };
    }

    // --- NATIVE N8N NODES WITH DYNAMIC EXPRESSIONS ---

    // 1. OpenAI / Gemini / Claude / DeepSeek / IA / LLM
    else if (tool.includes("openai") || tool.includes("gpt") || tool.includes("gemini") || tool.includes("claude") || tool.includes("deepseek") || tool.includes("ia") || tool.includes("assistant")) {
      type = "n8n-nodes-base.openAi";
      typeVersion = 1.1;
      parameters = {
        resource: "chat",
        operation: "create",
        model: tool.includes("gemini") ? "gemini-1.5-pro" : tool.includes("deepseek") ? "deepseek-reasoner" : "gpt-4o",
        messages: {
          messageValues: [
            {
              role: "system",
              message: `Tu es un assistant IA spécialisé. Ta tâche est : ${step.action}. Réponds en français.`
            },
            {
              role: "user",
              message: "={{ $json.body || $json.text || $json.message || 'Exécuter la tâche' }}"
            }
          ]
        },
        options: {
          temperature: 0.7
        }
      };
    }
    // 2. Google Sheets
    else if (tool.includes("sheet") || tool.includes("tableur")) {
      type = "n8n-nodes-base.googleSheets";
      typeVersion = 4;
      const isRead = action.includes("lire") || action.includes("extraire") || action.includes("chercher") || action.includes("trouver") || action.includes("récupérer");
      parameters = {
        resource: "spreadsheet",
        operation: isRead ? "read" : "appendRow",
        spreadsheetId: {
          __rl: true,
          value: "SPREADSHEET_ID",
          mode: "id"
        },
        sheetName: {
          __rl: true,
          value: "Feuille 1",
          mode: "name"
        },
        options: {},
        ...(isRead ? {} : {
          columns: {
            mappingMode: "defineBelow",
            value: {
              date: "={{ $now }}",
              action: step.action,
              resultat: "={{ $json.output || $json.text || $json.message }}"
            }
          }
        })
      };
    }
    // 3. Gmail / Google Email / E-mail / Outlook / Email
    else if (tool.includes("email") || tool.includes("gmail") || tool.includes("mail") || tool.includes("courriel")) {
      type = "n8n-nodes-base.gmail";
      typeVersion = 2;
      const isSend = action.includes("envoyer") || action.includes("répondre") || action.includes("expédier") || action.includes("send");
      parameters = {
        resource: "message",
        operation: isSend ? "send" : "getAll",
        emailAs: "text",
        ...(isSend ? {
          subject: `=AURA - Suivi automatique : ${step.action.slice(0, 30)}...`,
          emailType: "text",
          message: "=Bonjour,\n\nVoici le résultat généré par l'automatisation AURA :\n\n{{ $json.output || $json.text || $json.message }}\n\nCordialement,\nVotre Agent AURA",
          to: ["destinataire@example.com"]
        } : {
          limit: 5,
          simple: true
        })
      };
    }
    // 4. Slack / Mou
    else if (tool.includes("slack") || tool.includes("mou")) {
      type = "n8n-nodes-base.slack";
      typeVersion = 2;
      parameters = {
        resource: "message",
        operation: "post",
        select: "channel",
        channelId: {
          __rl: true,
          value: "general",
          mode: "name"
        },
        messageType: "text",
        text: `=📢 *AURA Automatisation*\n*Action :* ${step.action}\n*Résultat :* {{ $json.output || $json.text || $json.message }}`
      };
    }
    // 5. Telegram / Télégramme
    else if (tool.includes("telegram") || tool.includes("télégramme")) {
      type = "n8n-nodes-base.telegram";
      typeVersion = 1;
      parameters = {
        resource: "message",
        operation: "sendMessage",
        chatId: "CHAT_ID",
        text: `=📢 *AURA Notification*\n*Action :* ${step.action}\n*Résultat :* {{ $json.output || $json.text || $json.message }}`
      };
    }
    // 6. Notion
    else if (tool.includes("notion")) {
      type = "n8n-nodes-base.notion";
      typeVersion = 2;
      parameters = {
        resource: "databasePage",
        operation: "create",
        databaseId: {
          __rl: true,
          value: "DATABASE_ID",
          mode: "id"
        },
        properties: {
          propertyValues: [
            {
              key: "Name",
              title: `=AURA : ${step.action.slice(0, 50)}`
            },
            {
              key: "Description",
              richText: [
                {
                  text: {
                    content: "={{ $json.output || $json.text || $json.message }}"
                  }
                }
              ]
            }
          ]
        }
      };
    }
    // 7. Airtable
    else if (tool.includes("airtable")) {
      type = "n8n-nodes-base.airtable";
      typeVersion = 2;
      parameters = {
        resource: "record",
        operation: "append",
        application: {
          __rl: true,
          value: "APP_ID",
          mode: "id"
        },
        table: {
          __rl: true,
          value: "TABLE_NAME",
          mode: "name"
        },
        columns: {
          columnValues: [
            {
              fieldName: "Tache",
              fieldValue: step.action
            },
            {
              fieldName: "Resultat",
              fieldValue: "={{ $json.output || $json.text || $json.message }}"
            }
          ]
        }
      };
    }
    // 8. Shopify
    else if (tool.includes("shopify")) {
      type = "n8n-nodes-base.shopify";
      typeVersion = 1;
      parameters = {
        resource: "order",
        operation: "get",
        orderId: "={{ $json.body.order_id || $json.id || 'ORDER_ID' }}"
      };
    }
    // 9. Webhook / Forms trigger
    else if (tool.includes("webhook") || tool.includes("forms") || tool.includes("formulaire") || tool.includes("porte")) {
      type = "n8n-nodes-base.webhook";
      typeVersion = 2;
      parameters = {
        path: `aura-webhook-node-${index}`,
        httpMethod: "POST",
        responseMode: "onReceived",
        options: {}
      };
    }
    // 10. ActiveCampaign
    else if (tool.includes("activecampaign")) {
      type = "n8n-nodes-base.activeCampaign";
      typeVersion = 1;
      parameters = {
        resource: "contact",
        operation: "create",
        email: "={{ $json.email || 'email@example.com' }}",
        firstName: "={{ $json.firstName || 'Client' }}",
        lastName: "AURA"
      };
    }
    // 11. Twilio
    else if (tool.includes("twilio") || tool.includes("sms")) {
      type = "n8n-nodes-base.twilio";
      typeVersion = 1;
      parameters = {
        resource: "sms",
        operation: "send",
        from: "SENDER_NUMBER",
        to: "RECIPIENT_NUMBER",
        message: `=AURA : {{ $json.output || $json.text || $json.message }}`
      };
    }
    // 12. Google Calendar / Calendrier
    else if (tool.includes("calendar") || tool.includes("calendrier")) {
      type = "n8n-nodes-base.googleCalendar";
      typeVersion = 2;
      parameters = {
        resource: "event",
        operation: "create",
        calendarId: {
          __rl: true,
          value: "primary",
          mode: "id"
        },
        start: "={{ $now }}",
        end: "={{ $now.plus({hours: 1}) }}",
        summary: `Rendez-vous AURA : ${step.action.slice(0, 30)}`,
        description: "=Liaison AURA :\n\n{{ $json.output || $json.text || $json.message }}"
      };
    }
    // 13. Google Drive / Drive
    else if (tool.includes("drive")) {
      type = "n8n-nodes-base.googleDrive";
      typeVersion = 3;
      parameters = {
        resource: "file",
        operation: "list",
        options: {}
      };
    }

    return { type, typeVersion, parameters };
  };

export const getMakeModuleConfig = (step, index) => {
    const tool = String(step.tool || '').toLowerCase();
    const action = String(step.action || '').toLowerCase();

    // Default configuration
    let module = "gateway:custom-webhook";
    let mapper: any = {
      action: step.action,
      tool: step.tool,
      input_data: "{{1.output}}"
    };

    // 1. Gmail / Google Email
    if (tool.includes("email") || tool.includes("gmail") || tool.includes("mail") || tool.includes("courriel")) {
      const isSend = action.includes("envoyer") || action.includes("répondre") || action.includes("expédier") || action.includes("send");
      module = isSend ? "gmail:SendAnEmail" : "gmail:WatchEmails";
      mapper = isSend ? {
        subject: `[AURA] Suivi automatique : ${step.action.slice(0, 30)}`,
        content: "{{1.output}}",
        to: ["destinataire@example.com"]
      } : {
        folder: "INBOX",
        filter: "UNREAD"
      };
    }
    // 2. Google Sheets
    else if (tool.includes("sheet") || tool.includes("tableur")) {
      const isRead = action.includes("lire") || action.includes("extraire") || action.includes("chercher") || action.includes("trouver") || action.includes("récupérer");
      module = isRead ? "google-sheets:SearchRows" : "google-sheets:AddARow";
      mapper = isRead ? {
        spreadsheetId: "SPREADSHEET_ID",
        sheetName: "Feuille 1",
        query: step.action
      } : {
        spreadsheetId: "SPREADSHEET_ID",
        sheetName: "Feuille 1",
        values: {
          A: "{{now}}",
          B: step.action,
          C: "{{1.output}}"
        }
      };
    }
    // 3. Slack
    else if (tool.includes("slack") || tool.includes("mou")) {
      module = "slack:CreateAMessage";
      mapper = {
        channel: "general",
        text: `[AURA] Notification :\n{{1.output}}`
      };
    }
    // 4. Telegram
    else if (tool.includes("telegram") || tool.includes("télégramme")) {
      module = "telegram:SendMessage";
      mapper = {
        chatId: "CHAT_ID",
        text: `[AURA] Notification :\n{{1.output}}`
      };
    }
    // 5. Notion
    else if (tool.includes("notion")) {
      module = "notion:CreateAPage";
      mapper = {
        databaseId: "DATABASE_ID",
        properties: {
          Name: `AURA : ${step.action.slice(0, 40)}`,
          Content: "{{1.output}}"
        }
      };
    }
    // 6. Airtable
    else if (tool.includes("airtable")) {
      module = "airtable:CreateARecord";
      mapper = {
        baseId: "BASE_ID",
        tableId: "TABLE_NAME",
        fields: {
          Tache: step.action,
          Resultat: "{{1.output}}"
        }
      };
    }
    // 7. Shopify
    else if (tool.includes("shopify")) {
      module = "shopify:WatchOrders";
      mapper = {
        status: "any"
      };
    }
    // 8. OpenAI / GPT / LLMs
    else if (tool.includes("openai") || tool.includes("gpt") || tool.includes("gemini") || tool.includes("claude") || tool.includes("deepseek") || tool.includes("ia")) {
      module = "openai:CreateACompletion";
      mapper = {
        model: "gpt-4o",
        messages: [
          {
            role: "system",
            content: `Ta tâche est : ${step.action}`
          },
          {
            role: "user",
            content: "{{1.output}}"
          }
        ]
      };
    }
    // 9. Twilio
    else if (tool.includes("twilio") || tool.includes("sms")) {
      module = "twilio:SendSMS";
      mapper = {
        from: "SENDER_NUMBER",
        to: "RECIPIENT_NUMBER",
        message: `AURA : {{1.output}}`
      };
    }
    // 10. Google Calendar / Calendrier
    else if (tool.includes("calendar") || tool.includes("calendrier")) {
      module = "google-calendar:CreateAnEvent";
      mapper = {
        calendarId: "primary",
        summary: `Rendez-vous AURA : ${step.action.slice(0, 30)}`,
        description: "{{1.output}}",
        startDate: "{{now}}",
        duration: 60
      };
    }

    return { module, mapper };
  };

export const generateN8nWorkflow = (scen) => {
    const firstStepTool = String(scen.steps[0]?.tool || '').toLowerCase();
    const firstStepAction = String(scen.steps[0]?.action || '').toLowerCase();
    
    const isFirstStepEventDriven = 
      firstStepTool.includes("webhook") || 
      firstStepTool.includes("porte") || 
      firstStepTool.includes("forms") ||
      firstStepAction.includes("détecter") || 
      firstStepAction.includes("réceptionner") || 
      firstStepAction.includes("recevoir") ||
      firstStepAction.includes("quand") || 
      firstStepAction.includes("lors de");

    const nodes = [];
    const connections = {};
    let previousNodeName = "";
    let xPosition = 100;

    if (isFirstStepEventDriven) {
      const triggerPath = `aura-webhook-trigger-${scen.id}`;
      nodes.push({
        parameters: {
          path: triggerPath,
          options: {}
        },
        id: "start-node-id",
        name: "Déclencheur Webhook AURA",
        type: "n8n-nodes-base.webhook",
        typeVersion: 2,
        position: [xPosition, 300]
      });
      previousNodeName = "Déclencheur Webhook AURA";
      xPosition += 220;
    } else {
      nodes.push({
        parameters: {},
        id: "start-node-id",
        name: "Début Scénario AURA",
        type: "n8n-nodes-base.manualTrigger",
        typeVersion: 1,
        position: [xPosition, 300]
      });
      previousNodeName = "Début Scénario AURA";
      xPosition += 220;
    }

    scen.steps.forEach((step, index) => {
      const toolName = String(step.tool || '');
      const nodeName = `${toolName.replace(/[^a-zA-Z0-9\s]/g, '')} - Etape ${index + 1}`;
      
      const config = getN8nNodeConfig(step, index);

      nodes.push({
        parameters: config.parameters,
        id: `node-${step.id}-${index}`,
        name: nodeName,
        type: config.type,
        typeVersion: config.typeVersion,
        position: [xPosition, 300]
      });

      if (!connections[previousNodeName]) {
        connections[previousNodeName] = {
          main: [[]]
        };
      }

      connections[previousNodeName].main[0].push({
        node: nodeName,
        type: "main",
        index: 0
      });

      previousNodeName = nodeName;
      xPosition += 220;
    });

    return JSON.stringify({ nodes, connections }, null, 2);
  };

export const generateMakeBlueprint = (scen) => {
    const flow = scen.steps.map((step, index) => {
      const config = getMakeModuleConfig(step, index);
      return {
        id: index + 1,
        module: config.module,
        params: config.mapper,
        metadata: {
          designer: {
            x: index * 150,
            y: 0
          }
        }
      };
    });
    
    return JSON.stringify({
      name: `AURA - ${scen.name}`,
      flow: flow,
      metadata: {
        version: 1
      }
    }, null, 2);
  };


