# Project-Voting

1. install ganache - https://www.trufflesuite.com/ganache 
2. npm install 
3. truffle migrate 
4. npm start
program.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkShopEnrollmentApp
{
    //Do not change any code under this class
    public class Program
    {
        static void Main(string[] args)
        {
            TraineeBO objTraineeBO = new TraineeBO();
            TraineeBL objTraineeBL = new TraineeBL();            
            string traineeName = string.Empty;
            string batchCode = string.Empty;
            int numberOfTrainees =0;

            try
            {
                Console.WriteLine("Enter number of trainees:");
                numberOfTrainees = int.Parse(Console.ReadLine());
            }
            catch(FormatException traineeNumberException)
            {
                Console.WriteLine(traineeNumberException.Message);
                Environment.Exit(0);
            }
		for (int i = 0; i < numberOfTrainees; i++)
                {
                try
                {
                    Console.WriteLine("\nEnter Trainee Name:");
                    traineeName = Console.ReadLine();
                    if (string.IsNullOrEmpty(traineeName))
                        throw new Exception("Trainee Name can not be null or empty");
                    else
                        objTraineeBO.TraineeName = traineeName;
                }
                
            catch (Exception nameException)
            {
                Console.WriteLine(nameException.Message);
                Environment.Exit(0);
            }
                try
                {
                    Console.WriteLine("Enter Trainee Id:");
                    objTraineeBO.TraineeId = long.Parse(Console.ReadLine());
                }
                catch(FormatException idException)
                {
                    Console.WriteLine(idException.Message);
                    Environment.Exit(0);
                }
                try
                {
                    Console.WriteLine("Enter Trainee Batch Code:");
                    batchCode = Console.ReadLine();
                    if (string.IsNullOrEmpty(batchCode))
                        throw new Exception("Batch Code can not be null or empty");
                    else
                        objTraineeBO.BatchCode = batchCode;
                }
                catch(Exception batchCodeException)
                {
                    Console.WriteLine(batchCodeException.Message);
                    Environment.Exit(0);
                }
                    bool insertResult = objTraineeBL.SaveTraineeDetails(objTraineeBO);
                    if (insertResult == true)
                    {
                        Console.WriteLine("Trainee Details Successfully added to database");
                    }
                    else
                    {
                        Console.WriteLine("Trainee insertion failed..Duplicate TraineeId present or wrong application logic");
                        Console.WriteLine("Try Again");
                        i--;
                          
                    }
                }
        }
    }
}

traineeBl.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkShopEnrollmentApp
{
    //Write your code here
    public class TraineeBL
    {
        public bool SaveTraineeDetails(TraineeBO objBO)
        {
            TraineeDA tDA = new TraineeDA();
            bool res = tDA.AddTraineeDetails(objBO);
            if (res)
                return true;
            else
                return false;
        }
    }
}

traineeBO.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WorkShopEnrollmentApp
{
   //Write your code here
   public class TraineeBO
   {
       public long traineeId;
       public string traineeName;
       public string batchCode;
       
       public long TraineeId { get; set; }
       public string TraineeName { get; set; }
       public string BatchCode { get; set; }
       
       public TraineeBO()
       {
           
       }
       
       public TraineeBO(long traineeId, string traineeName, string batchCode)
       {
           this.traineeId = traineeId;
           this.traineeName = traineeName;
           this.batchCode = batchCode;
       }
   }
}

traineeDA.cs
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.SqlClient;
using System.Data;
using System.Configuration;

namespace WorkShopEnrollmentApp
{
     //Write your code here
    
    public class TraineeDA
    {
        public string ConnectionString
            {
                get
                {
                    return ConfigurationManager.ConnectionStrings["SqlCon"].ConnectionString;
                }
            } 
    
        public bool AddTraineeDetails(TraineeBO objBO)
        {
            try
            {
                SqlConnection con = new SqlConnection(ConnectionString);
                con.Open();
                string query = "insert into tblTrainee values("+objBO.TraineeId+",'"+objBO.TraineeName+"','"+objBO.BatchCode+"')";
                SqlCommand cmd = new SqlCommand(query, con);
                int i = cmd.ExecuteNonQuery();
                if(i > 0)
                    return true;
                else
                    return false;
            }
            catch(Exception e)
            {
                return false;
            }
        }
    }
}

24.seminar ticket booking


using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SeminarTicketBooking  //DO NOT change the namespace name
{
    public class Program   //DO NOT change the class name
    {
        public static string ConnectionString = ConfigurationManager.ConnectionStrings["ConnectionString"].ConnectionString;
        public static SqlConnection con = new SqlConnection(ConnectionString);
        
        public static void Main(string[] args)
        {
            bool showMenu = true;
            while (showMenu)
            {
                showMenu = MainMenu();
            }
        }

        private static bool MainMenu()
        {
            int input = 0;
            string name; string seatno;
            
            Program pgm = new Program();
            
            Console.WriteLine("Seminar Ticket Booking");
            Console.WriteLine("1. New Booking");
            Console.WriteLine("2. View All Booking");
            Console.WriteLine("3. Update Booking");
            Console.WriteLine("4. Exit");
            input = Convert.ToInt32(Console.ReadLine());

            if (input == 4)
            {                                          
                return false;
            }

            if (input == 1)
            {
                Console.WriteLine("Booking Name : ");
                name = Console.ReadLine();

                Console.WriteLine("Seat No. : ");
                seatno = Console.ReadLine();

                pgm.NewBooking(name, seatno);
            }
            if (input == 2)
            {
                pgm.GetAllBooking();
            }
            else if (input == 3)
            {
                Console.WriteLine("Booking Name : ");
                name = Console.ReadLine();

                Console.WriteLine("Seat No. : ");
                seatno = Console.ReadLine();

                pgm.UpdateBooking(name, seatno);
            }
           

            Console.WriteLine();
            return true;
        }
        
        public void GetAllBooking()  //DO NOT change method signature
        {
            //Fill your code here
            string query = "select Name, Seatno from Booking";
            
            
            con.Open();
            
            SqlCommand cmd = new SqlCommand(query, con);
            
            SqlDataReader reader = cmd.ExecuteReader();
            
            if(reader.HasRows)
            {
                while(reader.Read())
                {
                    Console.WriteLine(reader["Name"] + " " + reader["Seatno"]);
                }
            }
            
            con.Close();
            
            
        }    
        public void NewBooking(string name, string seatno)  //DO NOT change method signature
        {
            //Fill Code here
            
            string query = "insert into Booking(Name, Seatno) values ('" + name + "','" + seatno +"')";
            
            con.Open();
            
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.ExecuteNonQuery();
            
            con.Close();
            

        }
        public void UpdateBooking(string name, string seatno)   //DO NOT change method signature
        {
            //Fill Code here
            string query = "update Booking set Name = '" + name + "' where Seatno = '" + seatno + "'";
            
            con.Open();
            
            SqlCommand cmd = new SqlCommand(query, con);
            cmd.ExecuteNonQuery();
            con.Close();
        }
    }
}
