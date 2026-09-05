var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();




app.MapGet("/groceries", () => """
                      [
                          {
                              "id": "83c05832-6e35-4463-8a63-8647282982e5",
                              "name": "Drinks",
                              "products": [
                                  {
                                      "id": "369b8de6-92ae-454c-b945-a2e8e9519f5b",
                                      "name": "Coffee"
                                  },
                                  {
                                      "id": "92f30e81-9323-4fae-95cf-b98f36f3c213",
                                      "name": "Water"
                                  }
                              ]
                          },
                          {
                              "id": "b1849d69-a88b-4718-a748-0216422272e9",
                              "name": "Food",
                              "products": [
                                  {
                                      "id": "80b99bc2-3dd6-41fc-8a17-e197f95ea869",
                                      "name": "Bread"
                                  },
                                  {
                                      "id": "29d6a72f-fad1-4b8b-9de1-e6773186eaf2",
                                      "name": "Cheese"
                                  }
                              ]
                          }
                      ]
                      """);
app.Run();