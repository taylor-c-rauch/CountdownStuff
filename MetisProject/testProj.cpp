#include <iostream>
#include <fstream>
#include <vector>
#include <string>
#include <cstdlib>
#include <stdlib.h>
using namespace std;

class Article{
public:
  Article();
  ~Article();
  void print();
  string title;
  int indegree;
  vector<Article*> adj;
};
Article::Article(){
  title="";
  indegree=-1;
}
Article::~Article(){}
void Article::print(){
  cout<<this->title<<" ";
}

class Graph{
public:
  Graph();
  ~Graph();
  Article* findZeroIn();
  int findZeroInIndex();
  void deleteEdge(Article* v, Article* w);
  void deleteVertex(Article* v);
  int numVert;
  vector<Article*> graph;
  int next_loc;
};
Graph::Graph(){
  numVert=0;
  next_loc=0;
  graph.resize(100);
}
Graph::~Graph(){}

Article* Graph::findZeroIn(){
  for(int i=0;i<this->next_loc;i++){
    Article* v = this->graph[i];
    if(v->indegree==0){
      return v;
    }
  }return this->graph[0];
}
int Graph::findZeroInIndex(){
  for(int i=0;i<this->next_loc;i++){
    Article* v = this->graph[i];
    if(v->indegree==0){
      return i;
    }
  }return 0;
}

void Graph::deleteEdge(Article* v, Article* w){
  for(int i=0;i<this->numVert;i++){
    if(this->graph[i]->title.compare(w->title)==0){
      this->graph[i]->indegree-=1;
      return;
    }
  }
}

void Graph::deleteVertex(Article* v){
  for(int i=0;i<this->numVert;i++){
    if(this->graph[i]->title.compare(v->title)==0){
      this->graph[i]->indegree=-1;
      return;
    }
  }
}

//WRITE TOPOLOGICAL SORT METHOD, SEE SLIDES
vector<Article*> topologicalSort(Graph g){
  vector<Article*> result;
  for (int i=0;i<g.numVert;i++){
    Article* v = g.findZeroIn();
    int where = g.findZeroInIndex();
    result.push_back(v);
    for(Article* w: v->adj){
      g.deleteEdge(v,w);
    }g.deleteVertex(v);
  }return result;
}


int main (int argc, char **argv) {
  //create graph
  Graph info;
  
  for (int i=0;i<100; i++){
    Article* v = new Article();
    info.graph[i]=v;
  }

  // verify the correct number of parameters
  if ( argc != 2 ) {
    cout << "Must supply the input file name as the one and only parameter" << endl;
    exit(1);
  }
  // attempt to open the supplied file
  ifstream file(argv[1], ifstream::binary);
  // report any problems opening the file and then exit
  if ( !file.is_open() ) {
    cout << "Unable to open file '" << argv[1] << "'." << endl;
    exit(2);
  }
  // read in two strings
  bool cont=true;
  while (cont==true){
    int place1 = -1;
    int place2 = -1;
    string s1, s2;
    file >> s1;
    file >> s2;
    if ((s1==s2) &&(s1=="0" && s2=="0")){
      cont=false;
    }
    if(cont==true){
      //store strings
      bool add1=true;
      bool add2=true;
      for (int i = 0; i<info.next_loc;i++){
	Article* v = info.graph[i];
	//see if they already exist
	if (v->title.compare(s1)==0){
	  place1=i;
	  add1=false;
	}if(v->title.compare(s2)==0){
	  place2=i;
	  add2=false;
	  v->indegree+=1;
	}
      }
      //if not, add them
      if (add1==true){
	Article* x = new Article();
	x->title=s1;
	x->indegree=0;
	info.graph[info.next_loc]=x;
	place1=info.next_loc;
	info.next_loc+=1;
	info.numVert+=1;
      }if(add2==true){
	Article* y = new Article();
	y->title=s2;
	y->indegree=1;
	info.graph[info.next_loc]=y;
	place2=info.next_loc;
	info.next_loc+=1;
	info.numVert+=1;
      }
      //then, update indegrees, and list of adjacent vertices
      Article* v1 = info.graph[place1];
      Article* v2 = info.graph[place2];
      (v1->adj).push_back(v2);
    }
  }
  //close the file
  file.close();
  //do the sort, call topological sort
  vector<Article*> output = topologicalSort(info);
  //then print the results
  for(int i =0; i<output.size();i++){
    output[i]->print();
  }cout<<endl;
  return 0;
 
}
