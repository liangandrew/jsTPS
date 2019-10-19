class jTPS_Unit_Tests {
    /**
     * This JUnit test is for testing the adding of transactions.
     */
    //@Test
    constructor(){
        this.string = '';
    }

    assertEquals(num1, num2){
        if(num1==num2){
            this.string += '<br> Passed Test Assert Equals' + ": " + num1 + " " + num2 +"</br>";
        }
        else{
            this.string += '<br> Failed Test Assert Equals' + ": " + num1 + " " + num2 +"</br>";
        }

        return num1== num2;

    }

    assertFalse(a){
        if(a == false){
            this.string += '<br> Passed Assert False ' + ':' + a +"</br>";
        }
        else{
            this.string += '<br> Failed Assert False ' + ':' + a+"</br>";
        }
        return a == false;
    }

    assertTrue(a){
        if(a == true){
            this.string += '<br> Passed Assert False ' + ':' + a+"</br>";
        }
        else{
            this.string += '<br> Failed Assert False ' + ':' + a+"</br>";
        }
        return a== true;
    }
    print(a){
        this.string += '<br>' + a+"</br>";
    }
    testAdd() {
        this.print("Testing add");
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jTPS();
        let num = new Num();
        this.assertEquals(0, num.getNum());
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        console.log(num);
        this.assertEquals(num.getNum(),5);
        this.assertEquals(1, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(1, tps.getUndoSize());
        
        // ADD 10 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        this.assertEquals(15, num.getNum());
        this.assertEquals(2, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(2, tps.getUndoSize());
        
        // ADD 15 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assertEquals(35, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
    }
    
    /**
     * 
     */
    //@Test
    testAndMask() {
        this.print("Testing And Mask")
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jTPS();
        let num = new Num();
        this.assertEquals(0, num.getNum());
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 12));
        tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 4));
        this.assertEquals(4, num.getNum());
        this.assertEquals(2, tps.getSize());
        
        tps.undoTransaction();
        this.assertEquals(12, num.getNum());
        this.assertEquals(2, tps.getSize());
        this.assertEquals(1, tps.getRedoSize());
        this.assertEquals(1, tps.getUndoSize());

    }
    
    testOrMask() {
        this.print("Testing Or Mask");
        let tps = new jTPS();
        let num = new Num();
        this.assertEquals(0, num.getNum());

        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new OrMask_Transaction(num, num.getNum(), 13));
        this.assertEquals(13, num.getNum());
        this.assertEquals(2, tps.getSize());

        tps.undoTransaction();
        this.assertEquals(5, num.getNum());
        this.assertEquals(2, tps.getSize());
        this.assertEquals(1, tps.getRedoSize());
        this.assertEquals(1, tps.getUndoSize());
    }

    /**
     * This JUnit test is for testing the undoing of transactions.
     */
    //@Test
    testUndo() {
        this.print("Testing Undo");
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jTPS();
        let num = new Num();
        this.assertEquals(num.getNum(), 0);
        this.assertFalse(tps.hasTransactionToUndo());
        this.assertFalse(tps.hasTransactionToRedo());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertFalse(tps.hasTransactionToRedo());
        this.assertEquals(35, num.getNum());
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
        
        // UNDO A TRANSACTION
        tps.undoTransaction();
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertTrue(tps.hasTransactionToRedo());
        this.assertEquals(15, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(1, tps.getRedoSize());
        this.assertEquals(2, tps.getUndoSize());
        
        // UNDO ANOTHER
        tps.undoTransaction();
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertTrue(tps.hasTransactionToRedo());
        this.assertEquals(5, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(2, tps.getRedoSize());
        this.assertEquals(1, tps.getUndoSize());
        
        // AND ANOTHER
        tps.undoTransaction();
        this.assertFalse(tps.hasTransactionToUndo());
        this.assertTrue(tps.hasTransactionToRedo());
        this.assertEquals(0, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(3, tps.getRedoSize());
        this.assertEquals(0, tps.getUndoSize());
        
        // WE HAVE NO MORE TO UNDO SO THIS SHOULD DO NOTHING
        tps.undoTransaction();
        this.assertFalse(tps.hasTransactionToUndo());
        this.assertTrue(tps.hasTransactionToRedo());
        this.assertEquals(0, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(3, tps.getRedoSize());
        this.assertEquals(0, tps.getUndoSize());
    }
    
    /**
     * This JUnit test is for testing the redoing of transactions.
     */
    //@Test
    testRedo() {
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jTPS();
        let num = new Num();
        this.assertEquals(num.getNum(), 0);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertFalse(tps.hasTransactionToRedo());
        this.assertEquals(35, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
        
        // UNDO A TRANSACTION AND THEN REDO IT
        tps.undoTransaction();
        tps.doTransaction();
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertFalse(tps.hasTransactionToRedo());
        this.assertEquals(35, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
        
        // UNDO TWO TRANSACTIONS AND THEN REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertFalse(tps.hasTransactionToRedo());
        this.assertEquals(35, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
        
        // UNDO ALL THREE TRANSACTIONS AND REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertFalse(tps.hasTransactionToRedo());
        this.assertEquals(35, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
        
        // UNDO THREE TRANSACTIONS AND REDO TWO
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertTrue(tps.hasTransactionToRedo());
        this.assertEquals(15, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(1, tps.getRedoSize());
        this.assertEquals(2, tps.getUndoSize());
        
        // UNDO ALL THREE TRANSACTIONS AND REDO FOUR, WHICH
        // SHOULD NOT PRODUCE AN ERROR BUT THE LAST
        // REDO SHOULD DO NOTHING
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        this.assertTrue(tps.hasTransactionToUndo());
        this.assertFalse(tps.hasTransactionToRedo());
        this.assertEquals(35, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
    }    

    /**
     * This JUnit test is for testing clearing of transactions.
     */
    //@Test
    testClear() {
        this.print("Test Clear");
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jTPS();
        let num = new Num();
        this.assertEquals(num.getNum(), 0);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assertEquals(35, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
                
        // CLEAR ALL THE TRANSACTIONS
        tps.clearAllTransactions();
        this.assertEquals(35, num.getNum());
        this.assertEquals(0, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(0, tps.getUndoSize());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assertEquals(70, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
                
        // CLEAR THEM ALL OUT AGAIN
        tps.clearAllTransactions();
        this.assertEquals(70, num.getNum());
        this.assertEquals(0, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(0, tps.getUndoSize());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assertEquals(105, num.getNum());
        this.assertEquals(3, tps.getSize());
        this.assertEquals(0, tps.getRedoSize());
        this.assertEquals(3, tps.getUndoSize());
    }
}