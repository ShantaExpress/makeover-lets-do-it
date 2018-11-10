export class GridDataType{

    constructor(
      public field: String,
      public display: String,
      public visible: Boolean,
      public editable: Boolean,
      public type?: String,
      public parentApi?:String,
      public parentField?:String
    ) {  }
  
  }