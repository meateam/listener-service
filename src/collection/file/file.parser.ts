import FileResponse from "./file.response";
import { DataObjectType } from "mongo-to-rabbit/src/paramTypes";
import { concludeMongoOperation, RabbitMsgType } from "../collection.enum";

/**
 * fileIndexParser - take an event from file collection mongo and parse it to index queue
 * @param data  - data object type (from mongo change)
 * @returns {FileResponse} - file formatted msg
 */
export function fileIndexParser(data: DataObjectType): FileResponse | undefined {
  console.log("got data at fileIndexParser", data);
  let operation: RabbitMsgType = concludeMongoOperation(data.operation);

  if (operation === RabbitMsgType.UPDATE) {
    // If an update was done in mongo, change the msg event to metadata_change
    operation = RabbitMsgType.METADATA_CHANGE;

    // If size field in updated fields, don't send msg to the queue because it will
    // send by online edit service
    if ("size" in data.updateDescription.updatedFields) return;
  }

  const formattedData: FileResponse = new FileResponse({
    pushObjectReq: { event: operation },
    fileId: data.id,
  });

  return formattedData;
}
